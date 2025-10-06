import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

export const test = (req, res) => {
  res.json({
    message: "Hello World from controller",
  });
};
