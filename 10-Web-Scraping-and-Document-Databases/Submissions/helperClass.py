import pymongo

class HelperClass():
    def __init__(self):
        # Create connection variable
        self.conn = 'mongodb://localhost:27017'

        # Pass connection to the pymongo instance.
        self.engine = pymongo.MongoClient(self.conn)

        # Connect to a database. Will create one if not already available.
        self.db = self.engine.mars_db_20

    def insertData(self, data):
        # Drops collection if available to remove duplicates
        self.db.space.drop()

        # Creates a collection in the database and inserts two documents
        self.db.space.insert_many(
            [
                data
            ]
        )

        return({"ok": True})
