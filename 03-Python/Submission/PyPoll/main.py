import csv
import numpy as np

csvpath = "PyPoll\Resources\election_data.csv"

rows = []
with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    print(csvreader)

    csv_header = next(csvreader)
    
    for row in csvreader:
        rows.append(row)
total_votes = len(rows)

election = np.array(rows)
khan_votes = (election == "Khan").sum()
correy_votes = (election == "Correy").sum()
li_votes = (election == "Li").sum()
otooley_votes = (election == "O'Tooley").sum()

khan_percentage = (khan_votes / total_votes) * 100

khan_percentage_round = round(khan_percentage, 3)

correy_percentage = (correy_votes / total_votes) * 100

correy_percentage_round = round(correy_percentage, 3)

li_percentage = (li_votes / total_votes) * 100

li_percentage_round = round(li_percentage, 3)

otooley_percentage = (otooley_votes / total_votes) * 100

otooley_percentage_round = round(otooley_percentage, 3)

election_dictionary = {"Khan": khan_percentage_round,
                        "Correy":correy_percentage_round,
                        "Li": li_percentage_round,
                        "O'Tooley": otooley_percentage_round }

election_winner = max(election_dictionary, key = election_dictionary.get)

results = (f"""Election Results
_______________________________
Total Votes: {total_votes}
______________________________
Khan: {khan_percentage_round}% {khan_votes}
Correy: {correy_percentage_round}% {correy_votes}
Li: {li_percentage_round}% {li_votes}
O'Tooley: {otooley_percentage_round}% {otooley_votes}
______________________________
Winner: {election_winner}""")

print(results)

with open("PyPoll\\analysis\\analysis.txt", "w") as file:
    file.write(results)
