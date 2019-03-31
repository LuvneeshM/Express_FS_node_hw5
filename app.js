const express = require("express")
const app = express()
const port = 3000

var fs = require('fs')

const server = app.listen(port, listening)

const jsonObj = null 
const filename = "data.json"

function listening(){
	console.log("listening on port " + port)
}

//routes that save data to some JSON file
app.get("/saveme/:data1", saveData)
app.get("/saveme/:data2/:data3", saveData)
function saveData(req, res){
	const data = req.params
	var json = JSON.stringify(data)
	if (fs.existsSync(filename)){
		fs.readFile(filename, 'utf8', function(err, obj_data){
			if(err){
				console.log(err)
			}else{
				obj = JSON.parse(obj_data)
				temp_list = [data, obj]

				//using the reduce and concat methods to combine JSON objects (dictionaries)
				//into a single dictionary
				//makes each key point to a list and concts one to the other if they have the same key
				//else makes a new lisy and add to that
				var combined = temp_list.reduce(function (r, e){
					return Object.keys(e).forEach(function(k){
						if (!r[k]) r[k] = [].concat(e[k])
						else r[k] = r[k].concat(e[k])
					}), r
				}, {})
				var to_write = JSON.stringify(combined)
				fs.writeFile(filename, to_write, 'utf8', function(err){
					if (err) throw err
				});	
				res.send("Successfully saved the data to a JSON file. Go to route viewMe to see the content of the file.")
			}
		})
	}
	else{
		fs.writeFile(filename, json, 'utf8', function(err){
			if (err) throw err
			console.log('saved')
		});
		res.send("This is the first time you are saving data, making a new data.json file too.")
	}
	
}

//route to view the JSON file
app.get("/viewme", viewData)
function viewData(req, res){
	if (fs.existsSync(filename)){
		fs.readFile(filename, 'utf8', function(err, obj_data){
			if(err){
				console.log(err)
			}else{
				var data = JSON.parse(obj_data)
				// res.status(200).json({data})
				res.send({data})
			}
		})
	}
}