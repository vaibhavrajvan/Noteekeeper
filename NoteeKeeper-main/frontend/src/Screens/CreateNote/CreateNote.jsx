import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Error from "../../components/Error";
import Loading from "../../components/Loading/Loading";
import { marked } from "marked";
import { useHistory } from "react-router-dom";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  console.log(title, content, category);

  const history = useHistory();
  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);

  const { loading, error } = noteCreate;

  // submit handler func
  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !content || !category) return;
    dispatch(createNoteAction(title, content, category));

    resetHandler(e);

    history.push("/mynotes");
  };

  // reset handler func
  const resetHandler = (e) => {
    e.preventDefault();
    console.log("Reset Form");
    setTitle("");
    setContent("");
    setCategory("");
  };

  return (
    <div>
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl ">
        <span className="">Create a</span>{" "}
        <span className="text-indigo-600">Note</span>
      </h1>
      <div className="mx-auto container py-5">
        {/* <span className="text-lg font-bold tracking-tight">
          Create a new Note
        </span> */}

        <form
          onSubmit={submitHandler}
          className="bg-slate-300 pt-2 p-5 rounded-md shadow-lg shadow-slate-200 min-w-full"
        >
          {loading && <Loading />}
          {error && <Error message={error} />}
          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="title"
              id="title"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              id="content"
              placeholder="Content"
              rows={5}
              wrap="hard"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div>
            {content && (
              <>
                <h1 className="text-gray-800 font-semibold ">Note Preview</h1>

                {/* You can also use other libraries like react-markdownn for markdown */}
                <div
                  className="w-full bg-gray-100 px-4 py-2 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
                ></div>
              </>
            )}
          </div>

          {/* category */}
          <div>
            <label
              className="text-gray-800 font-semibold block my-3 text-md"
              htmlFor="category"
            >
              Category
            </label>
            <input
              className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="category"
              id="category"
              placeholder="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* buttons */}
          <div className="flex justify-start">
            <button
              type="submit"
              className=" mt-6 mr-3 bg-indigo-600 rounded-lg px-4 py-1.5 text-md text-white tracking-wide font-semibold font-sans"
            >
              Create Note
            </button>
            <button
              onClick={resetHandler}
              className=" mt-6 bg-indigo-300 rounded-lg px-4 py-1.5 text-md text-gray-800 tracking-wide font-semibold font-sans"
            >
              Reset Fields
            </button>
          </div>
          <h2 className="mt-3 font-semibold text-gray-600 italic text-sm">
            Creating on - {new Date().toLocaleDateString()}
          </h2>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
