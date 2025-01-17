import React from 'react';
import {Formik, Field, Form } from 'formik';
import axios from 'axios';
import './MovieForm.scss';

function MovieForm(props){
    const {currentMovie} = props;
    let initialValues;
    
    if(currentMovie){
        initialValues = {
            title: currentMovie.title,
            director: currentMovie.director,
            metascore: currentMovie.metascore,
            stars: currentMovie.stars
        }
    }
    else {
        initialValues = {
            title: '',
            director: '',
            metascore: '',
            stars: '',
        }
    }

    const submit = (formValues, action) =>{
        if(currentMovie !== undefined){
            edit(formValues,action)
        }
        else {
            add(formValues,action)
        }
    }

    const edit = (formValues, action) => {
        if(typeof(formValues.stars) === 'string'){
            formValues.stars = formValues.stars.split(',')
        }
        const params = {...formValues, id: currentMovie.id}
        axios.put(`http://localhost:5000/api/movies/${currentMovie.id}`, params)
        .then(() => {
            action.resetForm();
            props.history.replace("/")
        })
        .catch(err => {
            alert(err.message)
        })
    }

    const add = (formValues, action) => {
        if(typeof(formValues.stars) === 'string'){
            formValues.stars = formValues.stars.split(',')
        }
        axios.post('http://localhost:5000/api/movies/', formValues)
        .then(() => {
            action.resetForm();
            props.history.replace("/")
        })
        .catch(err => {
            alert(err.message)
        })
    }

    return(
        <Formik 
        initialValues={initialValues}
        onSubmit={submit}
        render={props => {
            return (
                <Form className='form'>
                    <label>Title</label>
                    <Field name='title' type='text' placeholder='title'/>
                    <label>Director</label>
                    <Field name='director' type='text' placeholder='director'/>
                    <label>Metascore</label>
                    <Field name='metascore' type='text' placeholder='metascore'/>
                    <label>Stars</label>
                    <Field name='stars' type='text' placeholder='stars'/>
                    <button type='submit'>Submit</button>
                </Form>
            )
        }}/>
    )
}

export default MovieForm;