import numpy as np
import pandas as pd
from flask import Flask, jsonify

from sqlalchemy import create_engine


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


path = "sqlite:///Resources/hawaii.sqlite"
engine = create_engine(path)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>" 
        f"/api/v1.0/precipitation" 
        f"/api/v1.0/stations" 
        f"/api/v1.0/tobs" 
        f"/api/v1.0/<start>"
        f"/api/v1.0/<start>/<end>"
    )

@app.route("/api/v1.0/precipitation")
def precipitation():
    conn = engine.connect()

    query = """
        select date, prcp
        from measurement
        where date >='2016-08-23';
        """
    df = pd.read_sql(query, conn)
    conn.close()
    data = df.to_dict(orient="records")
    return(jsonify(data))


@app.route("/api/v1.0/stations")
def stations():
    conn = engine.connect()
    query = """
        select *
        from station
        limit 10;
        """
    
    df = pd.read_sql(query, conn)
    conn.close()
    data = df.to_dict(orient="records")
    return(jsonify(data))

@app.route("/api/v1.0/tobs")
def tobs():
    conn = engine.connect()
    query = """
        SELECT s.station, count(m.id) as count
        from station s
        join measurement m on m.station = s.station
        group by s.station
        order by count desc
        limit 20;
        """
    df = pd.read_sql(query, conn)
    conn.close()
    data = df.to_dict(orient="records")
    return(jsonify(data))

@app.route("/api/v1.0/<start>")
def start(start):
    conn = engine.connect()
    query = f"""
        SELECT
            min(tobs) as tmin,
            max(tobs) as tmax,
            avg(tobs) as tavg
        FROM
            measurement
        WHERE
            date >= '{start}'
        """

    df = pd.read_sql(query, conn)
    conn.close()
    data = df.to_dict(orient="records")
    return(jsonify(data))


@app.route("/api/v1.0/<start>/<end>")
def start_end(start, end):
    conn = engine.connect()
    query = f"""
        SELECT
            min(tobs) as tmin,
            max(tobs) as tmax,
            avg(tobs) as tavg
        FROM
            measurement
        WHERE
            date >= '{start}'
            and date <= '{end}'
        """

    df = pd.read_sql(query, conn)
    conn.close()
    data = df.to_dict(orient="records")
    return(jsonify(data))


if __name__ == '__main__':
    app.run(debug=True)
