import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';

function MovieForm(props){
    return(
        <Formik 
        initialValues={''}
        onSubmit={props.submit}
        render={props => {
            return (
                <Form>
                    <Field name='title' type='text' placeholder='title'/>
                    <Field name='director' type='text' placeholder='director'/>
                    <Field name='metascore' type='text' placeholder='metascore'/>
                    <Field name='stars' type='text' placeholder='stars'/>
                    <button type='submit'>Submit</button>
                </Form>
            )
        }}/>
    )
}

export default MovieForm;