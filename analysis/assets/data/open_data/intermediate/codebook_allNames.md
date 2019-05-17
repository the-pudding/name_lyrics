
## allNames.csv & allNames.R

* `allNames.R`: The script used to process a file of song lyrics (that, due to copyright issues we can't release), to create `allNames.csv`. Some manual cleaning was conducted on the data, as described below.
* `allNames.csv`: The data, as described below

  - **What is this?**: A file containing each line of song lyrics in which a name was found
  - **Source(s) & Methods**: All songs used in this analysis were on the US Billboard Hot 100 list at least once since the chart’s inception in 1958. Song lyrics were obtained primarily through MetroLyrics. Many thanks to Colin Morris for providing lyric data for songs popular prior to 2017 (used in his project on repetition in pop music). Since these lyrics are user submitted, it is possibly (and even likely) that there are spelling errors that I was unable to compensate for. Over 15,000 songs that met the above criteria were analyzed, and of those, 5,195 contained a name (as defined below). To identify names in song lyrics, I used US national-level baby name data from the Social Security Administration (downloaded from Kaggle). Since there were over 93,000 names in this dataset, I limited my search to just those names that have been used as names at least 5,000 times since the 1950’s. This resulted in 3,607 names. I then searched through the song lyrics for any instance of any name in this dataset. Using the R package udpipe, I tagged each name with a part of speech to eliminate uses of words that were used as verbs (e.g., Will the person vs. “I will do something”) or adjectives (e.g., “baby girl”). I intended to retain only names tagged as proper nouns, but since song lyrics are not always grammatically correct, part of speech tagging can be inaccurate. Thus, I also manually checked the data, removing instances of names that were not being used as proper nouns. There were a few other manual corrections made. Last names presented as surnames (e.g., “Kennedy” in “John F. Kennedy”) were removed, but if the surname stood on its own (e.g. “I am the realest since Kennedy”) it could have been referring to a first name, so it was retained. Names that appeared to refer to a non-person (e.g., places, brands, drug references, colors, seasons, etc.) have been denoted in the `nonPerson` column. Double word names (e.g., Barbara Ann) were adjusted manually to count as a single entity rather than counting as “Barbara” and “Ann”.
  - **Last Modified**: May 16, 2019
  - **Contact Information**: [Amber Thomas](mailto:amber@pudding.cool)
  - **Spatial Applicability**: Based on United States Billboard Rankings
  - **Temporal Applicability**: Songs that made it to Billboard Hot 100 between 1958 and April 2019.
  - **Observations (Rows)**: There are 20626 rows in this dataset. Each row represents a single line in a song.
  - **Variables (Columns)**: There are 8 columns in this dataset. They
    are described below:

| Header      | Description                           | Data Type |
| :---------- | :------------------------------------ | :-------- |
| artist      | The name of the artist (including featured artists) | character |
| song        | Song Title | character |
| sentence    | The line of song lyrics that contained a name | character |
| highestRank | The highest rank this song hit on the Billboard Hot 100 Charts | character |
| year        | The earliest year that this song was on the charts | character |
| nonPerson   | Whether or not this name likely refers to a non-person (for instance, "Molly" is a name, but often also a drug reference). `NA` indicates that the name was manually determined to most likely refer to a person. | character |
| name        | Name detected in the lyrics | character |

