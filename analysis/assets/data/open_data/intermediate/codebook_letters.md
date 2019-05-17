
## letters.csv

* `letters.R`: The script used to process a file of lyrics (`allNames.csv`) that include a name. This dataset was derived from `allNames.csv`, so refer to that file's `Source` field for more information on how this data was collected. These data were used in the "Lettering" section of the "Sing My Name" Pudding story.
* `letters.csv`: The data, as described below

  - **What is this?**: The difference between usage of the first and last letters of names as used in song lyrics and in society.
 - **Source(s) & Methods**: See the `Source(s) & Methods` section of `allNames.csv` for more information. Calculated as the difference between the percentage of names mentioned in at least one song that starts or ends with a letter and the percentage of names that have been used as names in the US at least 5,000 times since 1950 that start or end with that letter.
  - **Last Modified**: May 16, 2019
  - **Contact Information**: [Amber Thomas](mailto:amber@pudding.cool)
  - **Spatial Applicability**: Based on United States Billboard Rankings
  - **Temporal Applicability**: Songs that made it to Billboard Hot 100 between 1958 and April 2019.
  - **Observations (Rows)**: There are 102 rows in this dataset. Each row represents a letter and associated condition, both as a first or last letter in a name, and when names are only those that refer to people vs. when they could refer to brands, seasons, cars, etc.
  - **Variables (Columns)**: There are 4 columns in this dataset. They
    are described below:

| Header   | Description                           | Data Type |
| :------- | :------------------------------------ | :-------- |
| letter   | A single letter of the alphabet | character |
| dif      | The difference between the percentage of names that start or end with this letter in songs as compared to society. A negative value is more common in society than in songs. | numeric   |
| position | Whether the letter is the first or last letter in a name | character |
| person   | Whether or not the name refers to a person (if `FALSE` could refer to a brand, drug, month, season, etc.) | logical   |

