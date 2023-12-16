import { GET_PAGES, UPDATE_PAGE } from "@/api/AdminApi";
import axios from "axios";
import Router, { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

const EditCmsForm = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const router = useRouter();
  //CK-EDITOR
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  React.useEffect(() => {
    setLoading(true);
    if (router.query.pageId) {
      axios({
        method: "GET",
        url: `${GET_PAGES}?id=${router.query.pageId}`,
      })
        .then((res) => {
          setLoading(false);
          const page = res.data.result[0];
          console.log("data", page);
          setId(page._id);
          setName(page.name);
          setTitle(page.title);
          setContent(page.content[0]);
          setDescription(page.description);
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoading(false);
        });
    }
  }, []);
console.log('content', content)
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      // case "content":
      //   setContent(value);
      //   break;

      default:
        break;
    }
  };

  const formHandler = () => {
    setLoading(true);
    console.log("formSubmitted");
    axios({
      method: "PUT",
      url: UPDATE_PAGE,
      data: {
        name,
        title,
        description,
        content,
        id,
      },
    })
      .then((res) => {
        console.log("res", res);
        toast.success(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
      });
  };

  return (
    <div className="p-4 rounded-b-lg bg-white shadow-sm">
      <p className="text-admin-dark-text font-bold text-xl pb-2 border-b">
        Edit Page
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formHandler();
        }}
      >
        {/* Title */}
        <div className="grid gap-1 my-4">
          <label htmlFor="title" className="text-admin-dark-text pl-1">
            Page Title
          </label>
          <br />
          <input
            autoFocus
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={inputChangeHandler}
            className="w-full h-10 bg-slate-100 px-2 rounded-lg  outline-admin-primary"
          />
        </div>
        {/* name */}
        <div className="grid gap-1 my-4">
          <br />
          <label htmlFor="name" className="text-admin-dark-text pl-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={inputChangeHandler}
            className="w-full h-10 bg-slate-100 px-2 rounded-lg  outline-admin-primary"
          />
        </div>
        {/* description */}
        <div className="grid gap-1 my-4">
          <br />
          <label htmlFor="description" className="text-admin-dark-text pl-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            value={description}
            onChange={inputChangeHandler}
            className="w-full h-10 bg-slate-100 px-2 rounded-lg  outline-admin-primary"
          />
        </div>
        {/* content */}
        {/* <div className="grid gap-1 my-4">
          <br />
          <label htmlFor="content" className="text-admin-dark-text pl-1">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            placeholder="content"
            value={content}
            onChange={inputChangeHandler}
            className="w-full h-10 bg-slate-100 px-2 rounded-lg  outline-admin-primary"
          />
        </div> */}
        <div className="grid gap-1 my-4">
          <br />
          <label htmlFor="content" className="text-admin-dark-text pl-1">
            Content
          </label>
          {/* //CK-EDITOR */}
          {editorLoaded ? (
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
            />
          ) : null}
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={() => {
              Router.back();
            }}
            type="button"
            disabled={loading}
            className="bg-admin-light-text text-white px-4 py-3 rounded-lg mr-2 w-48"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-admin-primary text-white px-4 py-3 rounded-lg  w-48"
            disabled={loading}
          >
            {!loading ? "Update" : "Please wait..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCmsForm;
