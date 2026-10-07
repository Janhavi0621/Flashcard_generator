import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiEdit } from "react-icons/fi";
import Layout from "../components/Layout";
import { addFlashcard } from "../store/flashcardsSlice";

const emptyTerm = { term: "", definition: "" };

const validate = (v) => {
  const errors = {};
  if (!v.group.trim()) errors.group = "Group name is required";
  if (!v.description.trim()) errors.description = "Description is required";
  const termErrors = v.terms.map((t) => {
    const e = {};
    if (!t.term.trim()) e.term = "Term is required";
    if (!t.definition.trim()) e.definition = "Definition is required";
    return e;
  });
  if (termErrors.some((e) => Object.keys(e).length)) errors.terms = termErrors;
  return errors;
};

const input = "w-full border border-indigo-300 rounded px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-brand";
const Err = ({ name }) => (
  <ErrorMessage name={name} component="p" className="text-xs text-brand mt-1" />
);

export default function CreateFlashcard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Layout title="Create Flashcard">
      <Formik
        initialValues={{ group: "", description: "", terms: [{ ...emptyTerm }] }}
        validate={validate}
        onSubmit={(values, { resetForm }) => {
          dispatch(addFlashcard(values));
          resetForm();
          navigate("/my-flashcards");
        }}
      >
        {({ values, isValid, dirty }) => (
          <Form noValidate>
            <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex gap-4 items-end mb-4">
                <div className="w-72">
                  <label htmlFor="group" className="block text-sm text-slate-600 mb-1">Create Group*</label>
                  <Field id="group" name="group" className={input} />
                  <Err name="group" />
                </div>
              </div>
              <label htmlFor="description" className="block text-sm text-slate-600 mb-1">Add description*</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows={3}
                placeholder="Describe the roles, responsibilities, skills required for the job and help candidates understand the role better."
                className={`${input} max-w-xl`}
              />
              <Err name="description" />
              <p className="text-xs text-slate-500 mt-2">Images are generated automatically from your group and term names.</p>
            </section>

            <section
              className={`bg-white rounded-lg shadow-sm p-6 transition-opacity ${!values.group.trim() ? "opacity-50" : ""}`}
            >
              <FieldArray name="terms">
                {({ push, remove }) => (
                  <>
                    {values.terms.map((_, i) => (
                      <div key={i} className="flex gap-4 items-start mb-6">
                        <span className="w-7 h-7 shrink-0 rounded-full bg-red-300 text-white text-sm flex items-center justify-center mt-6">
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <label htmlFor={`term-${i}`} className="block text-sm text-slate-600 mb-1">Enter Term*</label>
                          <Field id={`term-${i}`} name={`terms.${i}.term`} className={input} />
                          <Err name={`terms.${i}.term`} />
                        </div>
                        <div className="flex-1">
                          <label htmlFor={`def-${i}`} className="block text-sm text-slate-600 mb-1">Enter Definition*</label>
                          <Field id={`def-${i}`} name={`terms.${i}.definition`} className={input} />
                          <Err name={`terms.${i}.definition`} />
                        </div>
                        <div className="flex flex-col gap-2 mt-6 text-blue-600">
                          <button
                            type="button"
                            aria-label={`Delete term ${i + 1}`}
                            disabled={values.terms.length === 1}
                            onClick={() => remove(i)}
                            className="disabled:opacity-30 text-slate-600"
                          >
                            <FiTrash2 />
                          </button>
                          <button
                            type="button"
                            aria-label={`Edit term ${i + 1}`}
                            onClick={() => document.getElementById(`term-${i}`)?.focus()}
                          >
                            <FiEdit />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ ...emptyTerm })}
                      className="text-sm text-blue-600 font-medium"
                    >
                      + Add more
                    </button>
                  </>
                )}
              </FieldArray>
            </section>

            <div className="text-center mt-8">
              <button
                type="submit"
                disabled={!dirty || !isValid}
                className="bg-brand text-white text-sm font-medium px-14 py-2.5 rounded disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}
