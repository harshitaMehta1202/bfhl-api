const express = require("express");
const app = express();

app.use(express.json());

const EMAIL = "harshita1236.be23@chitkarauniversity.edu.in";


app.get("/health", (req, res) => {
  res.json({
    is_success: true,
    official_email: EMAIL
  });
});


app.post("/bfhl", (req, res) => {
  const body = req.body;
  let result;

  if (body.fibonacci !== undefined) {
    let n = body.fibonacci;
    let arr = [0, 1];
    for (let i = 2; i < n; i++) {
      arr.push(arr[i - 1] + arr[i - 2]);
    }
    result = arr.slice(0, n);
  }

  else if (body.prime) {
    result = body.prime.filter(num => {
      if (num < 2) return false;
      for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
      }
      return true;
    });
  }

  else if (body.lcm) {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const lcm = (a, b) => (a * b) / gcd(a, b);
    result = body.lcm.reduce(lcm);
  }

  else if (body.hcf) {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    result = body.hcf.reduce(gcd);
  }

  else if (body.AI) {
   async function askAI(question) {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: `Answer in ONE WORD only. No explanation. Question: ${question}`
            }
          ]
        }
      ]
    }
  );

  return response.data.candidates[0].content.parts[0].text.trim();
}

  }

  else {
    return res.status(400).json({
      is_success: false,
      official_email: EMAIL,
      data: "Invalid input"
    });
  }

  res.json({
    is_success: true,
    official_email: EMAIL,
    data: result
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
