function convertSpreadsheetToJson() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses 14/10/2024");
    var data = sheet.getDataRange().getValues();
    var questions = [];
    var currentQuestion = null;

    for (var i = 1; i <data.length; i++) {
        var row = data[i];

        var wrong_answers = row[12].split("\n")
        var tags = row[10].split("\n")

        currentQuestion = {
            "question_key": String(row[4]) || "",
            "skills": [],
            "toughness":String(row[18] || ""),
            "short_text":String(row[2] || ""),
            "question_type":String(row[1] || ""),
            "explanation":{
                "content": String(row[16] || ""),
                "content_type": String(row[17] || "")
            },
            "question_text":String(row[3] || ""),
            "multimedia":[],
            "content_type":String(row[5] || ""),
            "tag_names":tags,
            "input_output":[
                {
                    "input": "",
                    "question_id": String(row[0] || ""),
                    "wrong_answers": [
                        wrong_answers[0].split(":")[1].trim(),
                        wrong_answers[1].split(":")[1].trim(),
                        wrong_answers[2].split(":")[1].trim()
                    ],
                    "output": [
                        String(row[11]).split(":")[1].trim()
                    ]
                }
            ],
            "code_metadata":[
                {
                    "is_editable": false,
                    "language": String(row[15] || ""),
                    "code_data": String(row[14] || ""),
                    "default_code": true
                }
            ]
        }

        questions.push(currentQuestion)

    }

    const jsonString = JSON.stringify(questions, null, 2);
    // Logger.log(jsonString);
    var file = DriveApp.createFile('data.json', jsonString);
    Logger.log('JSON file created\n' + file.getUrl());
    }
    
