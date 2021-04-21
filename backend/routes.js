const pool = require('./db')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // POST /reset
  app.post('/reset', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query
        connection.query('drop table if exists test_table', function (err, rows, fields) {
          if (err) { 
            // if there is an error with the query, release the connection instance and log the error
            connection.release()
            logger.error("Problem dropping the table test_table: ", err); 
            res.status(400).send('Problem dropping the table'); 
          } else {
            // if there is no error with the query, execute the next query and do not release the connection yet
            connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem creating the table test_table: ", err);
                res.status(400).send('Problem creating the table'); 
              } else { 
                // if there is no error with the query, release the connection instance
                connection.release()
                res.status(200).send('created the table'); 
              }
            });
          }
        });
      }
    });
  });

  // POST /multplynumber
  app.post('/multplynumber', (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  });

  // GET /checkdb
  app.get('/values', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });
  
 
  /* BODY FORMAT FOR POST:
  {
	  "goalName" : "",
	  "goalNotes" : "",
	  "materials" : "",
	  "siteID" : 0,
	  "userID" : 0 
  }
  
  */
 
  // POST a goal for a site
  app.post('/goals', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
		  let goalName = req.body.goalName;
		  let goalNotes = req.body.goalNotes;
		  let materials = req.body.materials;
		  let siteID = req.body.siteID;
		  let userID = req.body.userID;
		  //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO goals (goalName, goalNotes, materials, siteID, userID) VALUES (?, ?, ?, ?, ?)", [goalName, goalNotes, materials, siteID, userID], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into goals table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`added the goal to the table!`);
          }
        });
      }
    });
  });
  
  // GET a specific goal for a site
  app.get('/goals', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
		  var siteID = req.param('siteID');
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("SELECT * FROM goals WHERE goals.siteID = ?", siteID, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });
  
  /* BODY FORMAT FOR PUT:
  {
	  "goalName" : "",
	  "goalNotes" : "",
	  "materials" : "",
	  "userID" : 0 
  }
  
  PARAM:
  goalID
  
  */
   // Update a goal for a specific site
  app.put('/goals', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
		  var goalID = req.param('goalID');
		  let goalName = req.body.goalName;
		  let goalNotes = req.body.goalNotes;
		  let materials = req.body.materials;
		  let userID = req.body.userID;

        // if there is no issue obtaining a connection, execute query and release connection
		if (goalName != "") {
        connection.query("UPDATE goals SET goals.goalName = ? WHERE goalID = (?)", [goalName, goalID], function (err, rows, fields) {
          
		  if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem updating the goals table: \n", err);
            res.status(400).send('Problem updating the table'); 
          }
        });
		}
		 if (goalNotes != "") {
			connection.query("UPDATE goals SET goals.goalNotes = ? WHERE goalID = (?)", [goalNotes, goalID], function (err, rows, fields) {
         
		  if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem updating the goals table: \n", err);
            res.status(400).send('Problem updating the table'); 
          }
        });
		}
		if (materials != "") {
			connection.query("UPDATE goals SET goals.materials = ? WHERE goalID = (?)", [materials, goalID], function (err, rows, fields) {
       
		  if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem updating the goals table: \n", err);
            res.status(400).send('Problem updating the table'); 
          }
        });
		}
		if (userID != "") {
			connection.query("UPDATE goals SET goals.userID = ? WHERE goalID = (?)", [userID, goalID], function (err, rows, fields) {
         
		  if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem updating the goals table: \n", err);
            res.status(400).send('Problem updating the table'); 
          }
		  else {res.status(200).send(`Updated the specified elements in the table!`);}
        });
		}
		connection.release();
      }
    });
  });
  
   // Delete a goal for a site
  app.delete('/goals', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
		  var goalID = req.param('goalID');
		  //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("DELETE FROM goals WHERE goals.goalID = (?)", goalID, function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem deleting from the goals table: \n", err);
            res.status(400).send('Problem deleting from the table'); 
          } else {
            res.status(200).send(`Deleted ${req.body.goalID} from the table!`);
          }
        });
      }
    });
  });
  
  // GET all users who supply materials
  app.get('/suppliers', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("SELECT userID, first_name, last_name FROM users WHERE users.userType = 2", function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });
}