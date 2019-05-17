
## timeless_names.csv

* `timeless_names.R`: The script used to process a file of lyrics (`allNames.csv`) that include a name. This dataset was derived from `allNames.csv`, so refer to that file's `Source` field for more information on how this data was collected. These data were used in the "Timeless Names" section of the "Sing My Name" Pudding story.
* `timeless_names.csv`: The data, as described below

  - **What is this?**: Dataset giving the top 10 names per decade (based on number of songs that use the name)
  - **Source(s) & Methods**: See the `Source(s) & Methods` section of `allNames.csv` for more information.
  - **Last Modified**: May 16, 2019
  - **Contact Information**: [Amber Thomas](mailto:amber@pudding.cool)
  - **Spatial Applicability**: Based on United States Billboard Rankings
  - **Temporal Applicability**: Songs that made it to Billboard Hot 100 between 1958 and April 2019.
  - **Observations (Rows)**: There are 120 rows in this dataset. Each row represents a single name & condition. That is, "Molly", may show up twice in a single decade if it is used at least once to refer to a person and also to refer to a drug. The usage is distinguishable by the `person` column.
  - **Variables (Columns)**: There are 5 columns in this dataset. They
    are described below:

| Header | Description                           | Data Type |
| :----- | :------------------------------------ | :-------- |
| decade | The earlist decade that the song appeared on the Billboard Hot 100 (starting in the 1960's) | numeric   |
| name   | The name identified in the song lyrics | character |
| n      | The count of songs that included each name in a decade | integer   |
| rank   | The numeric rank (1-10) of this name's popularity per decade | integer   |
| person | Whether or not the name refers to a person (if `FALSE` could refer to a brand, drug, month, season, etc.) | logical   |

