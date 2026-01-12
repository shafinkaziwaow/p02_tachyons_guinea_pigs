# Shafin Kazi, Alvin Sze, Thamidur Rahman, Sean Takahashi
# Tachyons Guinea Pigs
# SoftDev pd4
# p02
# 2026-01-16f

from flask import Flask, render_template, request, flash, url_for, redirect, session


app = Flask(__name__)
app.secret_key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"


