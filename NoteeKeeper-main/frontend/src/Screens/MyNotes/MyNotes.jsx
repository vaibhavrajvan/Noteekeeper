import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listNotesAction, noteDeleteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";

import { marked } from "marked";

const MyNotes = ({ searchQuery }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // console.log(searchQuery);

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;
  // console.log(loading, notes, error);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { error: errorDelete, success: successDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you Sure...?"));
    dispatch(noteDeleteAction(id));
  };

  useEffect(() => {
    dispatch(listNotesAction());

    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  return (
    <div>
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl ">
        <span className="block xl:inline">Welcome back</span>{" "}
        <span className="block text-indigo-600 xl:inline">{userInfo.name}</span>
      </h1>

      {/* Create NewNote Button */}
      <Link to="/createnote" className="inline-block">
        <button className="flex items-center px-1 py-2 mt-4 font-medium  text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAoklEQVRIie2VXQrDIBCEv8acqzfokQq5VV5DjxUU+2CEZWH9SWghJANiVndmGEEDV8UKxG2sPcQJ8IKsR4a17oF3yaAkHgs8aezlwqga3Da/GsQsOFlog1boNA+rUW/UjiH3WwZR1QwVwcOwjsiM3IufJ7gNzmswi++lh9j65mRhLV7l9xg08f9+kwPpNTySIsjCqc0IPNmfLJB+Wp+d/CviCxenMK+etFDPAAAAAElFTkSuQmCC"
            alt="createIcon"
          />
          <span className="mx-1">Create New Note</span>
        </button>
      </Link>

      {/* Card Container */}
      <div className="mx-auto container py-10">
        <div className="">
          {error && <Error message={error} />}
          {loading && <Loading />}
          {/* Mapping Cards */}
          {notes
            ?.filter((filteredNote) =>
              filteredNote.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
            .map((note) => (
              <Accordion key={note._id} allowZeroExpanded={true}>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <h1 className="inline font-bold">{note.title}</h1>

                      <div className=" flex justify-end -mt-6">
                        <div>
                          <Link
                            to={`/note/${note._id}`}
                            className="w-8 h-8 mr-4 rounded-full dark:text-gray-800 bg-blue-400 text-white flex items-center justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-pencil"
                              width={20}
                              height={20}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                              <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                            </svg>
                          </Link>
                        </div>
                        <div>
                          <button
                            className="w-8 h-8 rounded-full font-extrabold dark:bg-red-400 dark:text-gray-800 bg-gray-800 text-white flex items-center justify-center"
                            onClick={() => deleteHandler(note._id)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>

                  <AccordionItemPanel>
                    <div className="inline-flex items-center px-2 py-1 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-500 mb-2 ">
                      <span className="mx-1">{note.category}</span>
                    </div>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(note.content),
                      }}
                    ></p>

                    <p className="mt-2 font-semibold text-gray-500 italic text-sm">
                      Created At -
                      {note.createdAt.split("T")[0] +
                        " " +
                        note.createdAt.substring(11, 19)}
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyNotes;
