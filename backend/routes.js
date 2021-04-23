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
		  let id = req.body.id;
		  let name = req.body.name;
		  let statusIn = req.body.status;
		  let inventory = req.body.inventory;
		  let quality = req.body.quality;
		  let supplier = req.body.supplier;
      let siteID = req.body.siteID;
      let userID = req.body.userID;
      
      console.log(userID);
      
		  //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO materials (id, name, status, inventory, quality, supplier,userID, siteID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [id, name, statusIn, inventory, quality, supplier,userID, siteID], function (err, result, fields) {
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
  app.get('/materials/:siteID', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
      let siteID = req.params.siteID;

		  //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("SELECT * FROM materials WHERE siteID = ?", [siteID], function (err, result, fields) {
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
    app.get('/materials/:supplier', (req, res) => {
      //console.log(req.body.product);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
        let supplier = req.params.supplier;
  
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
    app.get('/materials/:siteID', (req, res) => {
      //console.log(req.body.product);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
        let siteID = req.params.siteID;
  
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
  app.get('/equipment/:siteID', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
      let siteID = req.params.siteID;

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
  app.get('/announcement/:siteID', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      console.log("here");
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
      let siteID = req.params.siteID;

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
  app.get('/roster/:siteID', (req, res) => {
    //console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      console.log("here");
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
      let siteID = req.params.siteID;

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
      app.get('/equipment/:siteID', (req, res) => {
        //console.log(req.body.product);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection){
          if(err){
            // if there is an issue obtaining a connection, release the connection instance and log the error
            logger.error('Problem obtaining MySQL connection',err)
            res.status(400).send('Problem obtaining MySQL connection'); 
          } else {
          let siteID = req.params.siteID;
    
          //console.log(req.param);
            // if there is no issue obtaining a connection, execute query and release connection
            connection.query("SELECT * FROM equipment WHERE siteID = ?", [siteID], function (err, rows, fields) {
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
    
      //Post /site
      app.post('/site', (req, res) => {
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
                connection.query("INSERT INTO sites (description, start_date, end_date, location) VALUES (?, ?, ?, ?)", [description, startDate, endDate, location], function (err, result, fields) {
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
        connection.query("SELECT * FROM users WHERE userType = 1", function (err, result, fields) {
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
        let userID = req.params.userID;
        let firstName = req.params.firstName;
        let lastName = req.params.lastName;
        let username = req.params.username;
        let email = req.params.email;
  
        //console.log(req.param);
          // if there is no issue obtaining a connection, execute query and release connection
          if(first_name == NULL)
          connection.query("SELECT firstName, lastName, username, email FROM users WHERE firstName = ? OR lastName = ? OR email = ? OR username = ?", [firstName, lastName, email, username], function (err, rows, fields) {
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
        let userID = req.body.userID;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var password = req.body.password;
        var username = req.body.username;
        var email = req.body.email;
  
        //console.log(req.param);
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query("UPDATE users SET firstName = ?, lastName = ?, username = ?, password = ?, email = ? WHERE userID = ?", [firstName, lastName, username, password, email, userID], function (err, result, fields) {
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
        let userID = req.body.userID;
  
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
          connection.query("SELECT username, firstName, lastName, email, userID, siteID FROM users WHERE username = ? AND password = ?", [username, password], function (err, result, fields) {
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
      let firsName = req.body.firstName;
      let lastName = req.body.lastName;
      let username = req.body.username;
      let password = req.body.password;
      let siteID = req.body.siteID;
      
      //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO users (userType, firstName, lastName, username, password, siteID) VALUES (?, ?, ?, ?, ?, ?)", [userType, firstName, lastName, username, password, siteID], function (err, rows, fields) {
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

}