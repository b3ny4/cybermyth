import 'bootstrap/dist/css/bootstrap.min.css';

//import questions from 'raw-loader!./questions/example.qs';
// import questions2 from 'raw-loader!./questions/example2.qs';
import questions from 'raw-loader!./questions/enabled.ls';

function main () {
    console.log(questions);
}

window.onload = main;