
## repeats.csv & repeats.R

* `repeats.R`: The script used to process a file of lyrics (`allNames.csv`) that include a name. This dataset was derived from `allNames.csv`, so refer to that file's `Source` field for more information on how this data was collected. These data were used in the "Repeat Names" section of the "Sing My Name" Pudding story.
* `repeats.csv`: The data, as described below

  - **What is this?**: A dataset of the most popular name mentioned in over 15,000 top songs
  - **Source(s) & Methods**: See the `Source(s) & Methods` section of `allNames.csv` for more information.
  - **Last Modified**: May 16, 2019
  - **Contact Information**: [Amber Thomas](mailto:amber@pudding.cool)
  - **Spatial Applicability**: Based on United States Billboard Rankings
  - **Temporal Applicability**: Songs that made it to Billboard Hot 100 between 1958 and April 2019.
  - **Observations (Rows)**: There are 5946 rows in this dataset.
    Each row represents a single song.
  - **Variables (Columns)**: There are 5 columns in this dataset. They
    are described below:

| Header | Description                           | Data Type |
| :----- | :------------------------------------ | :-------- |
| artist | The artist of the song | character |
| song   | Song title | character |
| person | Whether or not a name likely represents a person (if `FALSE` the name may be referencing a drug, brand, month etc.) | logical   |
| name   | The most popular name detected in the song | character |
| n      | The count of times that the name is used in the song | integer   |

