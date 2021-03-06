const pool = require('./db')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // // POST /reset
  // app.post('/reset', (req, res) => {
  //   // obtain a connection from our pool of connections
  //   pool.getConnection(function (err, connection){
  //     if (err){
  //       console.log(connection);
  //       // if there is an issue obtaining a connection, release the connection instance and log the error
  //       logger.error('Problem obtaining MySQL connection', err)
  //       res.status(400).send('Problem obtaining MySQL connection'); 
  //     } else {
  //       // if there is no issue obtaining a connection, execute query
  //       connection.query('drop table if exists test_table', function (err, rows, fields) {
  //         if (err) { 
  //           // if there is an error with the query, release the connection instance and log the error
  //           connection.release()
  //           logger.error("Problem dropping the table test_table: ", err); 
  //           res.status(400).send('Problem dropping the table'); 
  //         } else {
  //           // if there is no error with the query, execute the next query and do not release the connection yet
  //           connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
  //             if (err) { 
  //               // if there is an error with the query, release the connection instance and log the error
  //               connection.release()
  //               logger.error("Problem creating the table test_table: ", err);
  //               res.status(400).send('Problem creating the table'); 
  //             } else { 
  //               // if there is no error with the query, release the connection instance
  //               connection.release()
  //               res.status(200).send('created the table'); 
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  // });

  // // POST /multplynumber
  // app.post('/multplynumber', (req, res) => {
  //   console.log(req.body.product);
  //   // obtain a connection from our pool of connections
  //   pool.getConnection(function (err, connection){
  //     if(err){
  //       // if there is an issue obtaining a connection, release the connection instance and log the error
  //       logger.error('Problem obtaining MySQL connection',err)
  //       res.status(400).send('Problem obtaining MySQL connection'); 
  //     } else {
  //       // if there is no issue obtaining a connection, execute query and release connection
  //       connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
  //         connection.release();
  //         if (err) {
  //           // if there is an error with the query, log the error
  //           logger.error("Problem inserting into test table: \n", err);
  //           res.status(400).send('Problem inserting into table'); 
  //         } else {
  //           res.status(200).send(`added ${req.body.product} to the table!`);
  //         }
  //       });
  //     }
  //   });
  // });

  // // GET /checkdb
  // app.get('/values', (req, res) => {
  //   // obtain a connection from our pool of connections
  //   pool.getConnection(function (err, connection){
  //     if(err){
  //       // if there is an issue obtaining a connection, release the connection instance and log the error
  //       logger.error('Problem obtaining MySQL connection',err)
  //       res.status(400).send('Problem obtaining MySQL connection'); 
  //     } else {
  //       // if there is no issue obtaining a connection, execute query and release connection
  //       connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
  //         connection.release();
  //         if (err) {
  //           logger.error("Error while fetching values: \n", err);
  //           res.status(400).json({
  //             "data": [],
  //             "error": "Error obtaining values"
  //           })
  //         } else {
  //           res.status(200).json({
  //             "data": rows
  //           });
  //         }
  //       });
  //     }
  //   });
  // });
  
 
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
		  let siteID = req.param('siteID');
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
        var userID = req.param('userID');


        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("SELECT * FROM goals WHERE goals.siteID = ? OR goals.userID = ?", [siteID,userID], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json(
              rows
            );
          }
        });
      }
    });
  });
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
        connection.query("SELECT * FROM goals WHERE goals.siteID = ?", [siteID], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json(
              rows
            );
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
 app.put('/materials', (req, res) => {
  //console.log(req.body.product);
  // obtain a connection from our pool of connections
  pool.getConnection(function (err, connection){
    if(err){
      // if there is an issue obtaining a connection, release the connection instance and log the error
      logger.error('Problem obtaining MySQL connection',err)
      res.status(400).send('Problem obtaining MySQL connection'); 
    } else {
    var materialID = req.param('materialID');
    let status = req.body.status;


    if (status !== undefined) {
      connection.query("UPDATE materials SET status = ? WHERE materialID = (?)", [status, materialID], function (err, rows, fields) {
      
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem updating the goals table: \n", err);
            res.status(400).send('Problem updating the table'); 
          }else{
            connection.release();
            res.status(200).send(`Updated the specified elements in materials table!`);
          }
          
        });
    }

  }
  });
});

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
            res.status(200).send(`Deleted ${goalID} from the table!`);
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

  // POST users who supply materials
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
              res.status(200).send(result);
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
            res.status(200).send(result);
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
        connection.query("SELECT materialID,status,quantity,materialSupplied,companyName FROM materials as m LEFT JOIN suppliers s on m.supplierID = s.supplierID WHERE m.siteID = ? OR m.supplierID = ?", [siteID, supplierID], function (err, result, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem getting from test table: \n", err);
            res.status(400).send('Problem getting from table'); 
          } else {
            console.log(result);
            res.status(200).send(result);
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
              res.status(200).send(result);
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
              res.status(200).send(result);
            }
          });
        }
      });
    });

    // POST /equipment{siteID}
  app.post('/equipment', (req, res) => {
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
      let lastCheckout = req.body.lastCheckout;
      if(lastCheckout === undefined && userID !== undefined){
        lastCheckout = new Date();
      }
      
      //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO equipment (equipmentID, equipmentName, location, siteID, userID,lastCheckout) VALUES (?, ?, ?, ?, ?, ?)", [equipmentID, equipmentName, location, siteID, userID,lastCheckout], function (err, result, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            //res.end(JSON.stringify(result));
            res.status(200).send(result);
          }
        });
      }
    });
  });

  // GET /equipment/{siteID}
  app.get('/sites', (req, res) => {
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
          connection.query("SELECT * FROM sites WHERE siteID = ?", [siteID], function (err, result, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
            } else {
              res.status(200).send(result[0]);
            }
          });
        }
      });
    });


    app.post('/assignsite', (req, res) => {
      //console.log(req.body.product);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          let userID = req.body.userID;
          let siteID = req.body.siteID;

  
  
        //console.log(req.param);
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query("INSERT INTO roster (siteID,userID) VALUES (?,?)", [siteID,userID], function (err, result, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem inserting into table", err);
              res.status(400).send('Problem inserting into table'); 
            } else {
              res.status(200).send(result);
            }
          });
        }
      });
    });

    app.get('/usersites', (req, res) => {
      //console.log(req.body.product);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
          let userID = req.param('userID');
  
  
        //console.log(req.param);
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query("SELECT * FROM roster r LEFT JOIN sites s on r.siteID = s.siteID WHERE r.userID = ?", [userID], function (err, result, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
            } else {
              res.status(200).send(result);
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
        var userID = req.param('userID');


      //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("SELECT equipmentID,equipmentName,siteID,location,lastCheckout, u.userID,siteID,userType,firstName,lastName,username,email FROM equipment e LEFT JOIN users u on e.userID = u.userID WHERE siteID = ? OR u.userID = ?", [siteID, userID], function (err, result, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem getting from test table: \n", err);
            res.status(400).send('Problem getting from table'); 
          } else {
            res.status(200).send(result);
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
          let siteID = req.param('siteID');
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
                res.status(200).send(result);
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
          connection.query("SELECT id,date,notes,u.userID,siteID,userType,firstName,lastName,username,email FROM announcements a LEFT JOIN users u on a.userID = u.userID WHERE a.siteID = ?", [siteID], function (err, result, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem getting from test table: \n", err);
            res.status(400).send('Problem getting from table'); 
          } else {
            res.status(200).send(result);
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
        connection.query("SELECT u.userID,siteID,userType,firstName,lastName,username,email FROM roster r LEFT JOIN users u on r.userID = u.userID WHERE r.siteID = ?", [siteID], function (err, result, fields) {
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
            res.status(200).send(finalResult);
          }
        });
      }
    });
  });

      // // POST /equipment{siteID}
      // app.post('/announcements', (req, res) => {
      //   //console.log(req.body.product);
      //   // obtain a connection from our pool of connections
      //   pool.getConnection(function (err, connection){
      //     if(err){
      //       // if there is an issue obtaining a connection, release the connection instance and log the error
      //       logger.error('Problem obtaining MySQL connection',err)
      //       res.status(400).send('Problem obtaining MySQL connection'); 
      //     } else {
      //     let equipmentID = req.body.equipmentID;
      //     let equipmentName = req.body.equipmentName;
      //     let location = req.body.location;
      //     let siteID = req.body.siteID;
      //     let userID = req.body.userID;
          
      //     //console.log(req.param);
      //       // if there is no issue obtaining a connection, execute query and release connection
      //       connection.query("INSERT INTO equipment (equipmentID, equipmentName, location, siteID, userID) VALUES (?, ?, ?, ?, ?)", [equipmentID, equipmentName, location, siteID, userID], function (err, rows, fields) {
      //         connection.release();
      //         if (err) {
      //           // if there is an error with the query, log the error
      //           logger.error("Problem inserting into test table: \n", err);
      //           res.status(400).send('Problem inserting into table'); 
      //         } else {
      //           //res.end(JSON.stringify(result));
      //           res.status(200).send(`added to the table!`);
      //         }
      //       });
      //     }
      //   });
      // });
    
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
              let title = req.body.title;
              console.log("GOT PARAMS");

              let siteID = 0;
    
              
              //console.log(req.param);
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query("INSERT INTO sites (description, startDate, endDate, location, title) VALUES (?, ?, ?, ?, ?)", [description, startDate, endDate, location, title], function (err, result, fields) {
                  if (err) {
                    // if there is an error with the query, log the error
                    logger.error("Problem inserting into test table: \n", err);
                    res.status(400).send('Problem inserting into table'); 
                  } else {
                    console.log("SUCCESSFUL INSERT");

                    siteID = result['insertId'];
    
                    connection.query("INSERT INTO roster (siteID,userID) VALUES (?,?)", [siteID, userID], function (err, result, fields) {
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
        let siteID = req.param('siteID');

        
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
          res.status(200).send(JSON.stringify("Updated Successfully!"));


          
          
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
      let equipmentID = req.param('equipmentID');
      let location = req.body.location;

      
      let userID = req.body.userID;
      let now = undefined;
      console.log(userID);
      if(userID !== undefined || userID !== null){
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
        res.status(200).send(JSON.stringify("Updated Successfully!"));
        
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
        connection.query("SELECT firstName, lastName, username, email FROM users WHERE userType = 1", function (err, result, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem getting from test table: \n", err);
            res.status(400).send('Problem getting from table'); 
          } 
          else {
            res.status(200).send(result);
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
          connection.query("SELECT firstName, lastName, username, email, userID, userType FROM users WHERE firstName = ? OR lastName = ? OR email = ? OR username = ? OR userID = ?", [firstName, lastName, email, username, userID], function (err, result, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
            } 
            else {
              res.status(200).send(result);
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
        let userDescription = req.body.userDescription;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var password = req.body.password;
        var username = req.body.username;
        var email = req.body.email;

        // connection.query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username], function (err, result, fields) {
        //   if (err) {
        //     // if there is an error with the query, log the error
        //     logger.error("Problem inserting into test table: \n", err);
        //     res.status(400).send('Problem inserting into table'); 
        //   } else {
        //     if(result.length > 0){
        //         connection.release();
        //         res.status(400).send("User email or password is already being used");
        //     }
        //   }
        // });

        if(firstName !== undefined){
          
          connection.query("UPDATE users SET firstName = ? WHERE userID = ?", [firstName, userID], function (err, results, fields) {
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
              } else {
                console.log("Updated first name");
              }
          });
        }

        if(lastName !== undefined){
          
          connection.query("UPDATE users SET lastName = ? WHERE userID = ?", [lastName, userID], function (err, results, fields) {
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
              } else {
                console.log("Updated last name");
              }
          });
        }

        if(password !== undefined){
          
          connection.query("UPDATE users SET password = ? WHERE userID = ?", [password, userID], function (err, results, fields) {
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
              } else {
                console.log("Updated password");
              }
          });
        }

        if(username !== undefined){
          
          connection.query("UPDATE users SET username = ? WHERE userID = ?", [username, userID], function (err, results, fields) {
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
              } else {
                console.log("Updated username");
              }
          });
        }

        if(email !== undefined){
          
          connection.query("UPDATE users SET email = ? WHERE userID = ?", [email, userID], function (err, results, fields) {
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
              } else {
                console.log("Updated email");
              }
          });
        }

        // if(siteID !== undefined){
        //   //Title
        //   connection.query("UPDATE users SET siteID = ? WHERE userID = ?", [siteID, userID], function (err, results, fields) {
        //     if (err) {
        //       // if there is an error with the query, log the error
        //       logger.error("Problem getting from test table: \n", err);
        //       res.status(400).send('Problem getting from table'); 
        //       } else {
        //         console.log("Updated title");
        //       }
        //   });
        // }
        
      };
      });
    });


    // PUT /suppliers
    app.put('/suppliers', (req, res) => {
      //console.log(req.body.product);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } 
        else {
        let supplierID = req.param('supplierID');
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var password = req.body.password;
        var username = req.body.username;
        var email = req.body.email;
        var materialSupplied = req.body.materialSupplied;
        var companyName = req.body.companyName;

          // if there is no issue obtaining a connection, execute query and release connection
    if (firstName !== undefined) {
      connection.query("UPDATE suppliers SET suppliers.firstName = ? WHERE supplierID = (?)", [firstName, supplierID], function (err, rows, fields) {
        
    if (err) {
          // if there is an error with the query, log the error
          logger.error("Problem updating the goals table: \n", err);
          res.status(400).send('Problem updating the table'); 
        }
      });
  }
   if (lastName !== undefined) {
    connection.query("UPDATE suppliers SET suppliers.lastName = ? WHERE supplierID = (?)", [lastName, supplierID], function (err, rows, fields) {
       
    if (err) {
          // if there is an error with the query, log the error
          logger.error("Problem updating the goals table: \n", err);
          res.status(400).send('Problem updating the table'); 
        }
      });
  }
  if (password !== undefined) {
    connection.query("UPDATE suppliers SET suppliers.password = ? WHERE supplierID = (?)", [password, supplierID], function (err, rows, fields) {
     
    if (err) {
          // if there is an error with the query, log the error
          logger.error("Problem updating the goals table: \n", err);
          res.status(400).send('Problem updating the table'); 
        }
      });
  }
  if(username !== undefined){
    connection.query("UPDATE suppliers SET username = ? WHERE supplierID = ?", [username, supplierID], function (err, results, fields) {
      if (err) {
        // if there is an error with the query, log the error
        logger.error("Problem getting from test table: \n", err);
        res.status(400).send('Problem getting from table'); 
        } else {
          console.log("Updated username");
        }
    });
  }
    if (email !== undefined) {
      connection.query("UPDATE suppliers SET suppliers.email = ? WHERE supplierID = (?)", [email, supplierID], function (err, rows, fields) {
        
        if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem updating the goals table: \n", err);
              res.status(400).send('Problem updating the table'); 
            }
      });
    }
    if (materialSupplied !== undefined) {
      connection.query("UPDATE suppliers SET suppliers.materialSupplied = ? WHERE supplierID = (?)", [materialSupplied, supplierID], function (err, rows, fields) {
       
      if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem updating the goals table: \n", err);
            res.status(400).send('Problem updating the table'); 
          }
        });
    }
      if (companyName !== undefined) {
        connection.query("UPDATE suppliers SET suppliers.companyName = ? WHERE supplierID = (?)", [companyName, supplierID], function (err, rows, fields) {
          
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
              res.status(200).send(result);
            }
          });
        }
      });

    });

    // DELETE
    // /api/deleteit
    app.delete('/suppliers', async (req, res) => {  
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } 
        else {
        let supplierID = req.param('supplierID');
  
        //console.log(req.param);
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query("DELETE FROM suppliers WHERE supplierID = ?", supplierID, function (err, result, fields) {
            connection.release();
            if (err) {
              // if there is an error with the query, log the error
              logger.error("Problem getting from test table: \n", err);
              res.status(400).send('Problem getting from table'); 
            } else {
              res.status(200).send(result);
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
          connection.query("SELECT username, firstName, lastName,userType, email, userID FROM users WHERE username = ? AND password = ?", [username, password], function (err, result, fields) {
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
  // app.post('/announcements', (req, res) => {
  //   //console.log(req.body.product);
  //   // obtain a connection from our pool of connections
  //   pool.getConnection(function (err, connection){
  //     if(err){
  //       // if there is an issue obtaining a connection, release the connection instance and log the error
  //       logger.error('Problem obtaining MySQL connection',err)
  //       res.status(400).send('Problem obtaining MySQL connection'); 
  //     } else {
  //     let equipmentID = req.body.equipmentID;
  //     let equipmentName = req.body.equipmentName;
  //     let location = req.body.location;
  //     let siteID = req.body.siteID;
  //     let userID = req.body.userID;
      
  //     //console.log(req.param);
  //       // if there is no issue obtaining a connection, execute query and release connection
  //       connection.query("INSERT INTO equipment (equipmentID, equipmentName, location, siteID, userID) VALUES (?, ?, ?, ?, ?)", [equipmentID, equipmentName, location, siteID, userID], function (err, rows, fields) {
  //         connection.release();
  //         if (err) {
  //           // if there is an error with the query, log the error
  //           logger.error("Problem inserting into test table: \n", err);
  //           res.status(400).send('Problem inserting into table'); 
  //         } else {
  //           //res.end(JSON.stringify(result));
  //           res.status(200).send(`added to the table!`);
  //         }
  //       });
  //     }
  //   });
  // });

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
        let userDescription = req.body.userDescription;
        let companyName = req.body.companyName;
        let materialSupplied = req.body.materialSupplied;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let username = req.body.username;
        let password = req.body.password;
        let siteID = req.body.siteID;
        let email = req.body.email;

        let valid = true;

        connection.query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username], function (err, result, fields) {
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            if(result.length > 0){
              valid = false;
              console.log("change to false");

              res.status(200).send("User email or username is already being used");
              connection.release();
              


            }else{
              connection.query("SELECT * FROM suppliers WHERE email = ? OR username = ?", [email, username], function (err, result, fields) {
                if (err) {
                  // if there is an error with the query, log the error
                  logger.error("Problem inserting into test table: \n", err);
                  res.status(400).send('Problem inserting into table'); 
                } else {
                  if(result.length > 0){
                      valid = false;
                      console.log("change to false");

                      res.status(200).send("User email or username is already being used");
                      connection.release();
      
                  }else{
                    if(userDescription === "builder" || userDescription === "site manager"){
                      connection.query("INSERT INTO users (userType, firstName, lastName, username, password, email) VALUES (?, ?, ?, ?, ?, ?)", [userType, firstName, lastName, username, password, email], function (err, result, fields) {
                        
                        if (err) {
                          // if there is an error with the query, log the error
                          logger.error("Problem inserting into test table: \n", err);
                          res.status(400).send('Problem inserting into table'); 
                        } else {
                          let userID = result['insertId'];
                          if(siteID !== undefined){
                            connection.query("INSERT INTO roster (userID, siteID) VALUES (?, ?)", [result['insertId'],siteID], function (err, result, fields) {
                              if (err) {
                                // if there is an error with the query, log the error
                                logger.error("Problem inserting into test table: \n", err);
                                res.status(400).send('Problem inserting into table'); 
                              } else {
                                connection.release();
                                res.status(200).send("This is the userIDr created: " + userID);
                              }
                            });  
                          }else{
                            connection.release();
                            res.status(200).send("This is the userIDs created: " + userID);
                          }                       
                        }
                      });
                    }else if(userDescription === "supplier"){
                      connection.query("INSERT INTO suppliers (firstName, lastName, username, password, email, materialSupplied, companyName) VALUES (?, ?, ?, ?, ?, ?, ?)", [firstName, lastName, username, password, email,materialSupplied,companyName], function (err, result, fields) {
                        
                        if (err) {
                          // if there is an error with the query, log the error
                          logger.error("Problem inserting into test table: \n", err);
                          res.status(400).send('Problem inserting into table'); 
                        } else {
                          connection.release();
                          res.status(200).send(result);
                        }
                      });
            
                    }
                    
                  }
                }
              });
            }
          }
        });
      }
      //connection.release();

    });
  });
           
}