const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json()); //middleware express & server
// app.get('/', (req, res) => {
//   //   res.status(200).send('Hello from the serside');
//   res.status(404).json({ message: 'Hello from the serside', app: 'Nautours' });
// });
// app.post('/', (req, res) => {
//   res.send('you can post this point');
//   //res.status(404).json({ message: 'Hello from the serside', app: 'Nautours' });
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours', (req, res) => {
  //read data from api
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

//  below is read specific id data in json file

// app.get('/api/v1/tours/:id/:x/:y?', (req, res) => {
//optional paramenter
app.get('/api/v1/tours/:id', (req, res) => {
  //optional paramenter
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    // this one or below
    //if(id>tours.length){
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'succses',
    data: {
      tour,
    },
  });
});
// const newId = tours[tours.length - 1].id + 1;
// const newTour = Object.assign({ id: newId }, req.body);
// tours.push(newTour);

//create data in api
app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  //res.send('Done');
});

/// Pacth /Update data

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Update tour here..>',
    },
  });
});
const port = 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port}..`);
});
