import csv
import numpy as np

csvpath = "PyBank\\Resources\\budget_data.csv"

rows = []
with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    print(csvreader)

    csv_header = next(csvreader)
    
    for row in csvreader:
        rows.append(row)

total_months = len(rows)


A = np.array(rows)

total_prices = (A[:,1])
x=np.asfarray(total_prices,float)

sum_total = sum(x)

sum_total_2 = int(sum_total)


average_change = (sum(np.diff(x)) / 85)

average_change_2 = round(average_change, 2)


max_value = np.diff(x)
max_value_2 = np.max(max_value)
max_value_3 = int(max_value_2)



result = np.where(max_value == max_value_3)
# The output of 'result' shows that the month of interest is on the 24 index of 'max_value'. 
# However, the original array was 'rows' which is the 25 index. We add one for the change or differerence
# math operation. Thus, we find the month of interest on the 25 index of 'rows'

month_greatest = rows[25][0]

min_value = np.diff(x)
min_value_2 = np.min(min_value)
min_value_3 = int(min_value_2)



result2 = np.where(min_value == min_value_3)
# The output of 'result2' shows that the month of interest is on the 43 index of 'min_value'. 
# However, the original array was 'rows' which is the 44 index. We add one for the change or differerence
# math operation. Thus, we find the month of interest on the 44 index of 'rows'

print(result2)

month_lowest = rows[44][0]

results = (f"""Financial Analysis
-------------------------------
Total months: {total_months}
Total: ${sum_total_2}
Average Change: ${average_change_2}
Greatest Increase in Profits: {month_greatest} ${max_value_3}
Greatest Decrease in Profits: {month_lowest} ${min_value_3} """)

print(results)

with open("PyBank\\analysis\\analysis.txt", "w") as file:
    file.write(results)
