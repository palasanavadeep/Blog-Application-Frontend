import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'


function RTE({name , control ,defaultValue = '', label}) {

    return (
        <div className='w-full'>

            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            {/* using control passed by parent component to give access to data  */}
            <Controller 
            name={name || 'content'}
            control={control}  
            render={({field : {onChange}}) => (
                <Editor 
                apiKey='l33wuxsh3c7s4m2p5ol8jx4gh4ywsm68y692rihdlelnspt0'
                initialValue={defaultValue}
                init={{
                    initialValue : {defaultValue},
                    height : 500 ,
                    menubar : true,
                    plugins : [
                        "image",
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "anchor",
                    ],
                    toolbar:
                        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                }}

                onEditorChange={onChange}

                />
            )}
            />
        </div>
    )
}

export default RTE
