import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../Firebase/firebase.config';
import Loading from '../Loading/Loading';



const AddInformation = () => {
    const [file, setFile] = useState(null)
    const [img, setImg] = useState("")
    const [progress, setProgress] = useState(null)
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const stroageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(stroageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log(" upload is Pause");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }

            },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImg(downloadURL)
                    })
                }

            );

        };
        file && uploadFile();

    }, [file])

    const handelUpdate = async (data) => {

        setLoading(true)
        //    console.log(data.file[0])
        await addDoc(collection(db, "users"), {
            name: data.name,
            gender: data.select,
            img,
            id: data.id,
            location: data.location,
            Timestamp: serverTimestamp(),




        })
        reset()
        setLoading(false)
        toast.success(" update successfully")
        navigate('/')
    }

    console.log(file)
    return (
        <div >

            {
                loading &&
                <Loading></Loading>
            }

            <div>


                <div className=" min-h-screen mx-auto">
                    <div className="flex justify-center my-5  items-center">
                        <form
                            onSubmit={handleSubmit(handelUpdate)}

                            className="w-full md:w-1/2 flex flex-col items-center " >

                            <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">Add A Contact</h1>

                            <div className="w-3/4 mb-6">
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}

                                    // {...register("file", {
                                    //     required: "gender is required",
                                    // })}

                                    className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 shadow-lg" placeholder="file" required />
                            </div>

                            <div className="w-3/4 mb-6">
                                <input
                                    type="text"

                                    {...register("id", {
                                        required: "id is required",
                                    })}

                                    className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 shadow-lg" placeholder="ID" required />
                                {errors.id && (
                                    <p className="text-red-600" role="alert">
                                        {errors.id?.message}
                                    </p>
                                )}
                            </div>
                            <div className="w-3/4 mb-6">
                                <input
                                    type="text"
                                    {...register("name", {
                                        required: "gender is required",
                                    })}

                                    className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 shadow-lg" placeholder="Name" required />
                                {errors.gender && (
                                    <p className="text-red-600" role="alert">
                                        {errors.gender?.message}
                                    </p>
                                )}
                            </div>
                            <div className="w-3/4 mb-6">
                                <label htmlFor="select" className="block text-gray-700 font-semibold">Gender</label>
                                <select
                                    {...register("select", {
                                        required: "Please Select One",
                                    })}
                                    className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 shadow-lg "
                                    required >
                                    <option value={''} disabled hidden selected required>
                                        Select One
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="w-3/4 mb-6">
                                <input
                                    type="text"
                                    {...register("location", {
                                        required: "location is required",
                                    })}

                                    className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 shadow-lg" placeholder="Location" required />
                                {errors.location && (
                                    <p className="text-red-600" role="alert">
                                        {errors.location?.message}
                                    </p>
                                )}
                            </div>


                            {/* <div className="w-3/4 mb-6">
                            <input
                                type="text"
                                {...register("date", {
                                    required: "date is required",
                                })}

                                className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 shadow-lg" placeholder="Date" required />
                            {errors.date && (
                                <p className="text-red-600" role="alert">
                                    {errors.date?.message}
                                </p>
                            )}
                        </div>
                        <div className="w-3/4 mb-6">
                            <input
                                type="text"
                                {...register("time", {
                                    required: "time is required",
                                })}

                                className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 shadow-lg" placeholder="Time" required />
                            {errors.time && (
                                <p className="text-red-600" role="alert">
                                    {errors.time?.message}
                                </p>
                            )}
                        </div> */}




                            <div className="w-3/4 mt-4">
                                <button type="submit" className="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700 shadow-lg"

                                    disabled={progress !== null && progress < 100}
                                > Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddInformation;