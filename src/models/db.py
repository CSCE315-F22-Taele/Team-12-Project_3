import os, psycopg2

import click
from flask import current_app, g

    # if 'db' not in g:
    #     g.db = psycopg2.connect(
    #         host="localhost",
    #         database="baby-tracker",
    #         user="postgres",
    #         password="searchbar"
    #     )

    # return g.db
