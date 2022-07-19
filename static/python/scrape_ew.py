# %%
# import dependencies
import pandas as pd
import requests

# %% [markdown]
# ### WEB SCRAPE YEARLY BOX OFFICE
# Get the number of releases per year and their average box office

# %%
#Scrape usign request to get html of page
page = requests.get('https://www.boxofficemojo.com/year/?ref_=bo_nb_di_secondarytab')
b = page.content

# Using Pandas to convert html into dataframe
df_list = pd.read_html(b)
df = df_list[-1]


# Rename column name to be more accessible
df = df.rename(columns={"Total Gross":"Total_gross", "%± LY":"LY","#1 Release":"No1_release"})

# Save JSON to resources folder
# df.reset_index().to_json("../../Resources/box_office_scrape.json",orient='records')


df1 = pd.read_excel("../../Resources/Netflix_subscribers_AP_2013-2020.xlsx")





