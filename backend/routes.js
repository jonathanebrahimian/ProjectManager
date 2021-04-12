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
  
  // POST /multplynumber
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
      
		  //console.log(req.param);
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO materials (id, name, status, inventory, quality, supplier,userID, siteID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [id, name, statusIn, inventory, quality, supplier,userID, siteID], function (err, rows, fields) {
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
        connection.query("SELECT * FROM materials WHERE siteID = ?", [siteID], function (err, rows, fields) {
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
          connection.query("SELECT * FROM materials WHERE supplier = ? && status = 0", [supplier], function (err, rows, fields) {
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
          connection.query("SELECT * FROM materials WHERE siteID = ? && status = 1", [siteID], function (err, rows, fields) {
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

    // GET /sites/{userID}    sites user is a part of
    app.get('/materials/:siteID', (req, res) => {
      //console.log(req.body.product);
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection){
        if(err){
          // if there is an issue obtaining a connection, release the connection instance and log the error
          logger.error('Problem obtaining MySQL connection',err)
          res.status(400).send('Problem obtaining MySQL connection'); 
        } else {
        let userID = req.params.userID;
  
        //console.log(req.param);
          // if there is no issue obtaining a connection, execute query and release connection
          connection.query("SELECT s.* FROM sites s INNER JOIN roster r ON r.siteID = s.siteID WHERE r.userID = ?", [userID], function (err, rows, fields) {
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
}