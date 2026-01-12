# Shafin Kazi, Alvin Sze, Thamidur Rahman, Sean Takahashi
# Tachyons Guinea Pigs
# SoftDev pd4
# p02
# 2026-01-16f

from flask import Flask, render_template, request, session, redirect, url_for, flash
import sqlite3, os


app = Flask(__name__)
app.secret_key = os.urandom(24)
DB_FILE = "users.db"

def setup_database():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            password TEXT,
            points INTEGER
        );
    """)
    db.commit()
    db.close()
setup_database()

@app.route("/")
def disp_homepage():
    return render_template("home.html")

if __name__ == "__main__":
    app.debug = True
    app.run()


