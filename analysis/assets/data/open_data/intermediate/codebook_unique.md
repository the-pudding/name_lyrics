
## unique.csv & unique.R

* `unique.R`: The script used to process a file of lyrics (`allNames.csv`) that include a name. This dataset was derived from `allNames.csv`, so refer to that file's `Source` field for more information on how this data was collected. These data were used in the "Unique Names" & "Popular Names" sections of the "Sing My Name" Pudding story.
* `unique.csv`: The data, as described below


  - **What is this?**: Dataset representing the unique names used in each song.
  - **Source(s) & Methods**: See the `Source(s) & Methods` section of `allNames.csv` for more information.
  - **Last Modified**: May 16, 2019
  - **Contact Information**: [Amber Thomas](mailto:amber@pudding.cool)
  - **Spatial Applicability**: Based on United States Billboard Rankings
  - **Temporal Applicability**: Songs that made it to Billboard Hot 100 between 1958 and April 2019.
  - **Observations (Rows)**: There are 9785 rows in this dataset. Each row represents one name & usage combination in each individual song. That is, "Molly", may show up twice in a single song if it is used at least once to refer to a person and also to refer to a drug.
  - **Variables (Columns)**: There are 7 columns in this dataset. They
    are described below:

| Header      | Description                           | Data Type |
| :---------- | :------------------------------------ | :-------- |
| artist      | Name of the song's artist | character |
| name        | The person's name identified in the song | character |
| song        | Song title | character |
| person      | Whether or not the name likely refers to a person (if `FALSE` may refer to a drug, month, brand, car etc.) | logical   |
| sentence    | An example of the lyrics used in a song when mentioning the name | character |
| year        | The earliest year that the song appeared on the Billboard Hot 100 | numeric |
| highestRank | The highest rank that the song reached on the Billboard Hot 100 | numeric |

