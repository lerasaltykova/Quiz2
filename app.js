const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://lera:12345@cluster0.rqflecp.mongodb.net/?retryWrites=true&w=majority",

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const quizSchema = new mongoose.Schema({
  sid: String,
  name: String,
});

const Quiz = mongoose.model("examrecords", quizSchema);

async function createExamAndQuizzes() {
  try {
    const db = mongoose.connection.useDb("Exams23002");
    const quizzesCollection = db.collection("examrecords");

    const quizzesData = [
      {
        sid: "300356784",
        name: "Valeriya Saltykova",
      },
    ];
    await quizzesCollection.insertMany(quizzesData);

    console.log("Data has been loaded to database");
  } catch (error) {
    console.error(
      "Error creating Exams23002 database and quizes collection:",
      error
    );
  }
}

createExamAndQuizzes();
app.get("/", async (req, res) => {
  try {
    const { sid, name } = req.query;
    const quizDocument = new Quiz({ sid: sid, name: name });
    await quizDocument.save();

    res.send("Document added to Exam23002 database.");
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Error in inserting the document.");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
