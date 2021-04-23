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
    "goalName" : "Pool construction",
    "goalNotes" : "Lay concrete",
    "materials" : 1,
    "siteID" : 1,
    "userID" : 1,
    "endDate" : "2021-04-27"
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
		  let materialID = req.body.materialID;
		  let siteID = req.body.siteID;
		  let userID = req.body.userID;
      let endDate = req.body.endDate;
      //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO goals (goalName, goalNotes, materialID, siteID, userID, endDate) VALUES (?, ?, ?, ?, ?, ?)", [goalName, goalNotes, materialID, siteID, userID, endDate], function (err, rows, fields) {
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

 //Update a goal
 // PARAM:
 // int goalID

  /* BODY FORMAT FOR PUT:
  {
    "goalName" : "Pool flooring",
    "goalNotes" : "More concrete",
    "materials" : 1,
    "userID" : 1, 
    "endDate" : "2021-04-30"
  }
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
      let materialID = req.body.materialID;
      let userID = req.body.userID;
      let endDate = req.body.endDate;

        // if there is no issue obtaining a connection, execute query and release connection
    if (goalName !== undefined) {
        connection.query("UPDATE goals SET goals.goalName = ? WHERE goalID = (?)", [goalName, goalID], function (err, rows, fields) {
          
      if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem updating the goals table: \n", err);
            res.status(400).send('Problem updating the table'); 
          }
        });
    }
     if (goalNotes !== undefined) {
      connection.query("UPDATE goals SET goals.goalNotes = ? WHERE goalID = (?)", [goalNotes, goalID], function (err, rows, fields) {
         
      if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem updating the goals table: \n", err);
            res.status(400).send('Problem updating the table'); 
          }
        });
    }
    if (materialID !== undefined) {
      connection.query("UPDATE goals SET goals.materialID = ? WHERE goalID = (?)", [materialID, goalID], function (err, rows, fields) {
       
      if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem updating the goals table: \n", err);
            res.status(400).send('Problem updating the table'); 
          }
        });
    }
    if (endDate !== undefined) {
      connection.query("UPDATE goals SET goals.endDate = ? WHERE goalID = (?)", [endDate, goalID], function (err, rows, fields) {
       
      if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem updating the goals table: \n", err);
            res.status(400).send('Problem updating the table'); 
          }
        });
    }
      if (userID !== undefined) {
        connection.query("UPDATE goals SET goals.userID = ? WHERE goalID = (?)", [userID, goalID], function (err, rows, fields) {
          
          if (err) {
                // if there is an error with the query, log the error
                logger.error("Problem updating the goals table: \n", err);
                res.status(400).send('Problem updating the table'); 
              }
        });
      }
      connection.release();
      res.status(200).send(`Updated the specified elements in the table!`);
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
        connection.query("SELECT supplierID, firstName, lastName, username, email,materialSupplied,companyName FROM suppliers", function (err, rows, fields) {
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

  // GET all users who supply materials
  app.post('/suppliers', (req, res) => {
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          // if there is no issue obtaining a connection, execute query and release connection
          let companyName = req.body.companyName;
          let materialSupplied = req.body.materialSupplied;

          let firstName = req.body.firstName;
          let lastName = req.body.lastName;
          let username = req.body.username;
          let password = req.body.password;
          let siteID = req.body.siteID;
          let email = req.body.email;
          console.log(email);
          connection.query("INSERT INTO suppliers (firstName, lastName, username, password, email, materialSupplied,companyName) VALUES (?, ?, ?, ?, ?, ?, ?) ", [firstName, lastName, username, password, email,materialSupplied,companyName], function (err, rows, fields) {
            connection.release();
            if (err) {
              logger.error("Error while fetching values: \n", err);
              res.status(400).json({
                "error": "Error obtaining values"
              });
            } else {
              res.end(JSON.stringify(result));
            }
          });
        }
      });
    });
  
  // TO BE EDITED BY LAUREN
    /* BODY FORMAT FOR POST: 
  {
    "goalName" : "Pool construction",
    "goalNotes" : "Lay concrete",
    "materials" : 1,
    "siteID" : 1,
    "userID" : 1,
    "endDate" : "2021-04-27"
  }
  
  */

  // POST /materials
  app.post('/materials', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
      let siteID = req.param('siteID');
      let statusIn = req.body.status;
      let quantity = req.body.quantity;
      let supplierID = req.body.supplierID;
      
      
      //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO materials (status, quantity, supplierID, siteID) VALUES (?, ?, ?, ?)", [statusIn, quantity, supplierID, siteID], function (err, result, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.end(JSON.stringify(result));
            //res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  });

  // GET /materials/{siteID}
  app.get('/materials', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        var siteID = req.param('siteID');
        let supplierID = req.param('supplierID');


      //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("SELECT * FROM materials WHERE siteID = ? OR supplierID = ?", [siteID, supplierID], function (err, result, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem getting from test table: \n", err);
            res.status(400).send('Problem getting from table'); 
          } else {
            res.end(JSON.stringify(result));
          }
        });
      }
    });
  });

    // GET /materialrequests/{supplierID}     // requested materials for specific supplier
    app.get('/materials', (req, res) => {
      //console.log(req.body.product);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          var supplier = req.param('supplier');
  
        //console.log(req.param);
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query("SELECT * FROM materials WHERE supplier = ? && status = 0", [supplier], function (err, result, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
            } else {
              res.end(JSON.stringify(result));
            }
          });
        }
      });
    });

    // GET /materials/{siteID}    materials accepted but not delivered
    app.get('/materials', (req, res) => {
      //console.log(req.body.product);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          var siteID = req.param('siteID');
  
        //console.log(req.param);
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query("SELECT * FROM materials WHERE siteID = ? && status = 1", [siteID], function (err, result, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
            } else {
              res.end(JSON.stringify(result));
            }
          });
        }
      });
    });

    // POST /equipment{siteID}
  app.post('/announcements', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
      let equipmentID = req.body.equipmentID;
      let equipmentName = req.body.equipmentName;
      let location = req.body.location;
      let siteID = req.body.siteID;
      let userID = req.body.userID;
      
      //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO equipment (equipmentID, equipmentName, location, siteID, userID) VALUES (?, ?, ?, ?, ?)", [equipmentID, equipmentName, location, siteID, userID], function (err, result, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            //res.end(JSON.stringify(result));
            res.status(200).send(`added to the table!`);
          }
        });
      }
    });
  });

  // GET /equipment/{siteID}
  app.get('/equipment', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        var siteID = req.param('siteID');

      //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("SELECT * FROM equipment WHERE siteID = ?", [siteID], function (err, result, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem getting from test table: \n", err);
            res.status(400).send('Problem getting from table'); 
          } else {
            res.end(JSON.stringify(result));
          }
        });
      }
    });
  });

  //Post /announcement/{siteID}
  app.post('/announcement', (req, res) => {
        //console.log(req.body.product);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
          if(err){
            // if there is an issue obtaining a connection, release the connection instance and log the error
            logger.error('Problem obtaining MySQL connection',err)
            res.status(400).send('Problem obtaining MySQL connection'); 
          } else {
          console.log("IN ANNOUNCEMNT");

          let notes = req.body.notes;
          let siteID = req.body.siteID;
          let userID = req.body.userID;
          let date = new Date();
          console.log("GOT PARAMS");

          
          //console.log(req.param);
            // if there is no issue obtaining a connection, execute query and release connection
            connection.query("INSERT INTO announcements (date, notes, siteID, userID) VALUES (?, ?, ?, ?)", [date, notes, siteID, userID], function (err, result, fields) {
              connection.release();
              if (err) {
                // if there is an error with the query, log the error
                logger.error("Problem inserting into test table: \n", err);
                res.status(400).send('Problem inserting into table'); 
              } else {
                console.log("SUCCESSFUL INSERT");

                //res.end(JSON.stringify(result));
                res.status(200).send(JSON.stringify(result));
              }
            });
        }
    });
  });

  //get annoucements
  app.get('/announcement', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      console.log("here");
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        var siteID = req.param('siteID');

      //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("SELECT * FROM announcements WHERE siteID = ?", [siteID], function (err, result, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem getting from test table: \n", err);
            res.status(400).send('Problem getting from table'); 
          } else {
            res.status(200).send(JSON.stringify(result));
          }
        });
      }
    });
  });


  //get roster
  app.get('/roster', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      console.log("here");
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        var siteID = req.param('siteID');

      //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("SELECT * FROM users WHERE siteID = ?", [siteID], function (err, result, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem getting from test table: \n", err);
            res.status(400).send('Problem getting from table'); 
          } else {
            let finalResult = result.map( one =>  {
              delete one['password'];
              return one;
            }
              
              );
            res.status(200).send(JSON.stringify(finalResult));
          }
        });
      }
    });
  });

      // POST /equipment{siteID}
      app.post('/announcements', (req, res) => {
        //console.log(req.body.product);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
          if(err){
            // if there is an issue obtaining a connection, release the connection instance and log the error
            logger.error('Problem obtaining MySQL connection',err)
            res.status(400).send('Problem obtaining MySQL connection'); 
          } else {
          let equipmentID = req.body.equipmentID;
          let equipmentName = req.body.equipmentName;
          let location = req.body.location;
          let siteID = req.body.siteID;
          let userID = req.body.userID;
          
          //console.log(req.param);
            // if there is no issue obtaining a connection, execute query and release connection
            connection.query("INSERT INTO equipment (equipmentID, equipmentName, location, siteID, userID) VALUES (?, ?, ?, ?, ?)", [equipmentID, equipmentName, location, siteID, userID], function (err, rows, fields) {
              connection.release();
              if (err) {
                // if there is an error with the query, log the error
                logger.error("Problem inserting into test table: \n", err);
                res.status(400).send('Problem inserting into table'); 
              } else {
                //res.end(JSON.stringify(result));
                res.status(200).send(`added to the table!`);
              }
            });
          }
        });
      });
    
      // GET /equipment/{siteID}
      // app.get('/equipment', (req, res) => {
      //   //console.log(req.body.product);
      //   // obtain a connection from our pool of connections
      //   pool.getConnection(function (err, connection){
      //     if(err){
      //       // if there is an issue obtaining a connection, release the connection instance and log the error
      //       logger.error('Problem obtaining MySQL connection',err)
      //       res.status(400).send('Problem obtaining MySQL connection'); 
      //     } else {
      //       var siteID = req.param('siteID');
    
      //     //console.log(req.param);
      //       // if there is no issue obtaining a connection, execute query and release connection
      //       connection.query("SELECT * FROM equipment WHERE siteID = ?", [siteID], function (err, rows, fields) {
      //         connection.release();
      //         if (err) {
      //           // if there is an error with the query, log the error
      //           logger.error("Problem getting from test table: \n", err);
      //           res.status(400).send('Problem getting from table'); 
      //         } else {
      //           res.end(JSON.stringify(result));
      //         }
      //       });
      //     }
      //   });
      // });
    
      //Post /site
      app.post('/sites', (req, res) => {
            //console.log(req.body.product);
            // obtain a connection from our pool of connections
            pool.getConnection(function (err, connection){
              if(err){
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection',err)
                res.status(400).send('Problem obtaining MySQL connection'); 
              } else {
              console.log("IN SITE CREATION");
    
              let location = req.body.location;
              let startDate = req.body.startDate;
              let endDate = req.body.endDate;
              let description = req.body.description;
              let userID = req.body.userID;
              console.log("GOT PARAMS");

              let siteID = 0;
    
              
              //console.log(req.param);
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query("INSERT INTO sites (description, startDate, endDate, location) VALUES (?, ?, ?, ?)", [description, startDate, endDate, location], function (err, result, fields) {
                  if (err) {
                    // if there is an error with the query, log the error
                    logger.error("Problem inserting into test table: \n", err);
                    res.status(400).send('Problem inserting into table'); 
                  } else {
                    console.log("SUCCESSFUL INSERT");

                    siteID = result['insertId'];
    
                    connection.query("UPDATE users SET siteID = ? WHERE userID = ?", [siteID, userID], function (err, result, fields) {
                      connection.release();
                      if (err) {
                        // if there is an error with the query, log the error
                        logger.error("Problem inserting into test table: \n", err);
                        res.status(400).send('Problem inserting into table'); 
                      } else {
                        console.log("SUCCESSFUL INSERT");
                        //res.end(JSON.stringify(result));
                        res.status(200).send('Site Created!');
                      }
                    });
                  }
                });
                
            }
        });
      });

    // Put /equipment/{siteID}
    app.put('/sites', (req, res) => {
      //console.log(req.body.product);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
      if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        console.log("Inside put");
        let location = req.body.location;
        let title = req.body.title;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let description = req.body.description;
        let siteID = req.body.siteID;

        
        if(title !== undefined){
          //Title
          connection.query("UPDATE sites SET title = ? WHERE siteID = ?", [title,siteID], function (err, results, fields) {
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
              } else {
                console.log("Updated title");
              }
          });
        }


        if(location !== undefined){
          //Location
          connection.query("UPDATE sites SET location = ? WHERE siteID = ?", [location,siteID], function (err, results, fields) {
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
              } else {
                console.log("Updated location");
              }
          });
        }
        

        if(endDate !== undefined){
            //End Date
            connection.query("UPDATE sites SET endDate = ? WHERE siteID = ?", [endDate,siteID], function (err, results, fields) {
              if (err) {
                // if there is an error with the query, log the error
                logger.error("Problem getting from test table: \n", err);
                res.status(400).send('Problem getting from table'); 
                } else {
                  console.log("Updating End Date");
                }
            });
        }

        
          if(startDate !== undefined){

            //updating startDate
            connection.query("UPDATE sites SET startDate = ? WHERE siteID = ?", [startDate,siteID], function (err, results, fields) {
                if (err) {
                  // if there is an error with the query, log the error
                  logger.error("Problem getting from test table: \n", err);
                  res.status(400).send('Problem getting from table'); 
                  } else {
                    console.log("Updating Start Date");
                  }
              });
          }
          
          
          //updating description
          if(description !== undefined){
            connection.query("UPDATE sites SET description = ? WHERE siteID = ?", [description,siteID], function (err, results, fields) {
                
              if (err) {
                  // if there is an error with the query, log the error
                  logger.error("Problem getting from test table: \n", err);
                  res.status(400).send('Problem getting from table'); 
                  } else {
                    console.log("Updated description!");    
                  }
              });

          }

          connection.release();
          res.end(JSON.stringify("Updated Successfully!"));


          
          
      }
    });
  });


  // Put /checkout/{siteID}
  app.put('/equipment', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
    if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
      console.log("Inside put");
      let equipmentID = req.body.equipmentID;
      let location = req.body.location;
      
      let userID = req.body.userID;
      let now = undefined;

      if(userID !== undefined){
        now = new Date();
      }

      
      
        //Title
      connection.query("UPDATE equipment SET location = ?,userID = ?,lastCheckout = ? WHERE equipmentID = ?", [location,userID,now,equipmentID], function (err, results, fields) {
        if (err) {
          // if there is an error with the query, log the error
          logger.error("Problem getting from test table: \n", err);
          res.status(400).send('Problem getting from table'); 
          } else {
            console.log("Updated title");
          }
      });
      


      

        connection.release();
        res.end(JSON.stringify("Updated Successfully!"));
        
    }
  });
});

  // GET /builders
  app.get('/builders', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } 
      else {
      //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("SELECT firstName, lastName, username, email, siteID FROM users WHERE userType = 1", function (err, result, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem getting from test table: \n", err);
            res.status(400).send('Problem getting from table'); 
          } 
          else {
            res.end(JSON.stringify(result));
          }
        });
      }
    });
  });

    // GET /users/{userID} 
    app.get('/users', (req, res) => {
      //console.log(req.body.product);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } 
        else {
        let userID = req.param('userID');
        let firstName = req.param('firstName');

        let lastName = req.param('lastName');
        let email = req.param('email');
        let username = req.param('username');
  
        //console.log(req.param);
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query("SELECT firstName, lastName, username, email FROM users WHERE firstName = ? OR lastName = ? OR email = ? OR username = ? OR userID = ?", [firstName, lastName, email, username, userID], function (err, result, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
            } 
            else {
              res.end(JSON.stringify(result));
            }
          });
        }
      });
    });

    // PUT /users/{userID} 
    app.put('/users', (req, res) => {
      //console.log(req.body.product);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } 
        else {
        let userID = req.param('userID');
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var password = req.body.password;
        var username = req.body.username;
        var email = req.body.email;
  
        //console.log(req.param);
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query("UPDATE users SET firstName = ?, lastName = ?, username = ?, password = ?, email = ? WHERE userID = ?", [firstName, lastName, username, password, email, userID], function (err, result, fields) {
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
            } 
            else {
              res.end(JSON.stringify(result));
            }
          });
        }
      });
    });

    // DELETE
    // /api/deleteit
    app.delete('/users', async (req, res) => {  
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } 
        else {
        let userID = req.param('userID');
  
        //console.log(req.param);
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query("DELETE FROM users WHERE userID = ?", userID, function (err, result, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
            } else {
              res.end(JSON.stringify(result));
            }
          });
        }
      });

    });

     // GET /login
    app.post('/login', (req, res) => {
      //console.log(req.body.product);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } 
        else {
        let username = req.body.username;
        let password = req.body.password;
        console.log(password);
  
        //console.log(req.param);
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query("SELECT username, firstName, lastName,userType, email, userID, siteID FROM users WHERE username = ? AND password = ?", [username, password], function (err, result, fields) {
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
            } else {
              if(result.length === 0){
                connection.query("SELECT username, firstName, lastName, email, supplierID, companyName,materialSupplied FROM suppliers WHERE username = ? AND password = ?", [username, password], function (err, result, fields) {
                  
                  if (err) {
                    // if there is an error with the query, log the error
                    logger.error("Problem getting from test table: \n", err);
                    res.status(400).send('Problem getting from table'); 
                  } else{
                    console.log(result.length);
                    if(result.length === 0){
                      res.status(404).send('Invalid credentials'); 
                    }else{
                      res.status(200).json({
                        result,
                        "userDescription":"supplier"
                      });
                    }

                  }
                });
              }else{
                result = result[0];
                let description = "";

                if (result['userType'] === 0){
                  description = "site manager";
                }else if(result['userType'] === 1){
                  description = "builder";
                }

                res.status(200).json({
                  result,
                  "userDescription":description
                });
              }
            }
          });
          connection.release();
        }
      });
    });
  
  // POST /equipment{siteID}
  app.post('/announcements', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
      let equipmentID = req.body.equipmentID;
      let equipmentName = req.body.equipmentName;
      let location = req.body.location;
      let siteID = req.body.siteID;
      let userID = req.body.userID;
      
      //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO equipment (equipmentID, equipmentName, location, siteID, userID) VALUES (?, ?, ?, ?, ?)", [equipmentID, equipmentName, location, siteID, userID], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            //res.end(JSON.stringify(result));
            res.status(200).send(`added to the table!`);
          }
        });
      }
    });
  });

    // POST /register
  app.post('/register', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
      let userType = req.body.userType;
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      let username = req.body.username;
      let password = req.body.password;
      let siteID = req.body.siteID;
      let email = req.body.email;
      
      //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO users (userType, firstName, lastName, username, password, siteID, email) VALUES (?, ?, ?, ?, ?, ?, ?)", [userType, firstName, lastName, username, password, siteID, email], function (err, result, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(result);
          }
        });
      }
    });
  });
           
}