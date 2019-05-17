
## unique_by_artist.csv & unique_by_artist.R

* `unique_by_artist.R`: The script used to process a file of lyrics (`allNames.csv`) that include a name. This dataset was derived from `allNames.csv`, so refer to that file's `Source` field for more information on how this data was collected. These data were used in the "Unique Names" section of the "Sing My Name" Pudding story.
* `unique_by_artist.csv`: The data, as described below

  - **What is this?**: A dataset showing the count of unique names used by each artist
  - **Source(s) & Methods**: See the `Source(s) & Methods` section of `allNames.csv` for more information.
  - **Last Modified**: May 16, 2019
  - **Contact Information**: [Amber Thomas](mailto:amber@pudding.cool)
  - **Spatial Applicability**: Based on United States Billboard Rankings
  - **Temporal Applicability**: Songs that made it to Billboard Hot 100 between 1958 and April 2019.
  - **Observations (Rows)**: There are 8771 rows in this dataset. Each row represents one name, usage, and artist combination. That is, "Molly", may show up twice in a single artist's repertoire if it is used at least once to refer to a person and also to refer to a drug.
  - **Variables (Columns)**: There are 5 columns in this dataset. They
    are described below:

| Header | Description                           | Data Type |
| :----- | :------------------------------------ | :-------- |
| artist | Name of the song's artist | character |
| person | Whether or not the name refers to a person (if `FALSE` could refer to a brand, drug, month, season, etc.) | logical   |
| name   | The name of the person identified in a song | character |
| names  | The count of songs that use this name (by a specific artist) | integer   |
| songs  | The total number of songs by that artist in our database. | integer   |
