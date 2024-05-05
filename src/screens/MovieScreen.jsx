import axios from 'axios';
import React, { useEffect } from 'react'
import Modal from 'react-modal'
import PocketBase from 'pocketbase';
import MovieItem from '../components/MovieItem';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#1F2937',
    },
}

const MovieScreen = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [platform, setPlatform] = React.useState('Netflix');
    const [poster, setPoster] = React.useState('');
    const [cover, setCover] = React.useState('');
    const [year, setYear] = React.useState('');
    const [movieId, setMovieId] = React.useState('');
    const [type, setType] = React.useState('movie');
    const [categorie1, setCategorie1] = React.useState('');
    const [categorie2, setCategorie2] = React.useState('');
    const [categorie3, setCategorie3] = React.useState('');
    const [movies, setMovies] = React.useState([])

    useEffect(() => {
        getAllMovies()
    }, [])


    const getAllMovies = async () => {
    
        const req = axios.get(`https://viralmovie.fraporitmos.com/api/collections/movie/records?perPage=10`, 
)
        const res = await req;
        setMovies(res.data.items)
    }


    const getInfoMovie = async (movieId) => {
        const apiKey = "fc577ccdb6f92f6f931d3bc89ae59269"
        const req = axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-ES`)
        const res = await req;
        var basePosterUrl = "https://image.tmdb.org/t/p/w1280/"
        var baseCoverUrl = "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/"
        setPoster(basePosterUrl + res.data.poster_path)
        setCover(baseCoverUrl + res.data.backdrop_path)
        setName(res.data.title)
        setYear(res.data.release_date.split('-')[0])
        setDescription(res.data.overview)
        setCategorie1(res.data.genres[0].name)
        setCategorie2(res.data.genres[1].name)
        setCategorie3(res.data.genres[2].name)
    }


    const createInfoMovie = async () => {
    
        const pb = new PocketBase('https://viralmovie.fraporitmos.com');
        const data = {
            "themovieId": movieId,
            "platform": platform,
            "name": name,
            "imagePoster": poster,
            "imageCover": cover,
            "overview": description,
            "year": year,
            "categories":
            {
                "category_1": categorie1,
                "category_2": categorie2,
                "category_3": categorie3
            },
            "type": type
        };

        const record = await pb.collection('movie').create(data);
        if (record) {
            alert('Pelicula creada correctamente ✅')
            setIsOpen(false)
            window.location.reload()
        }
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div class="max-screen px-4  h-screen overflow-y-auto overflow-x-hidden ">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal" >
                <div style={{ height: '650px' }} class="flex flex-col overflow-y-auto    bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                    <div className='flex  gap-8 justify-center items-center'>
                        <img
                            alt="profil"
                            src={poster ? poster : 'https://res.cloudinary.com/frapoteam/image/upload/v1706143807/thumbnail_wp6lav.svg'}
                            class="mx-auto object-cover rounded-sm h-36 w-26 " />

                        <img
                            alt="profil"
                            src={cover ? cover : 'https://res.cloudinary.com/frapoteam/image/upload/v1706143807/thumbnail_wp6lav.svg'}

                            class="mx-auto object-cover rounded-sm h-44 w-94 " />
                    </div>
                    <div className='flex justify-center gap-4 mt-4'>
                        <input
                            value={poster}
                            onChange={(e) => setPoster(e.target.value)}
                            type="text"
                            class=" rounded-lg border-transparent appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none "
                            name="poster_movie"
                            placeholder="Image Poster" />
                        <input
                            value={cover}
                            onChange={(e) => setCover(e.target.value)}
                            type="text"
                            class=" rounded-lg border-transparent  appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none "
                            name="cover_movie"
                            placeholder="Image Cover" />
                    </div>
                    <div className='flex justify-center gap-4 mt-4'>
                        <input
                            value={movieId}
                            type="text"
                            onChange={(e) => setMovieId(e.target.value)}
                            class=" rounded-lg border-transparent appearance-none border border-gray-300  py-2 px-2  text-gray-900 font-bold placeholder-gray-400 shadow-sm text-base focus:outline-none "
                            name="idInfo_movie"
                            placeholder="The movie db ID" />
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            class=" rounded-lg border-transparent appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none "
                            name="name_movie"
                            placeholder="Name of movie" />


                    </div>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description_movie"
                        type="text"

                        rows="5"
                        class=" rounded-lg border-transparent appearance-none border border-gray-300 py-2 h-36 line-clamp-4	 px-4 mt-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Description of movie"
                    />
                    <div className='flex justify-center gap-4 mt-4'>
                    
                        <select 
                        onChange={(e) => setPlatform(e.target.value)}
                        id="animals" class="block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="animals">
                            <option value="">
                                Plataforma
                            </option>
                            <option value="Netflix">
                                Netflix
                            </option>
                            <option value="HBO Max">
                                HBO Max
                            </option>
                            <option value="Amazon Prime">
                                Amazon Prime
                            </option>
                            <option value="Disney Plus">
                                Disney Plus
                            </option>
                            <option value="Apple TV">
                                Apple TV
                            </option>
                            <option value="Start Plus">
                                Start Plus
                            </option>
                            <option value="Paramount Plus">
                                Paramount Plus
                            </option>
                            <option value="goldfish">
                                Claro Video
                            </option>
                        </select>


                        <input
                            value={categorie1}
                            onChange={(e) => setCategorie1(e.target.value)}
                            type="text"
                            class=" rounded-lg border-transparent  appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none "
                            name="categorie1_movie"
                            placeholder="Category type 2" />

                    </div>

                    <div className='flex justify-center gap-4 mt-4'>
                        <input
                            value={categorie2}
                            onChange={(e) => setCategorie2(e.target.value)}
                            type="text"
                            class=" rounded-lg border-transparent  appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none "
                            name="categorie2_movie"
                            placeholder="Category type 2" />
                        <input
                            value={categorie3}
                            onChange={(e) => setCategorie3(e.target.value)}
                            type="text"
                            class=" rounded-lg border-transparent  appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none "
                            name="categorie3_movie"
                            placeholder="Category type 2" />
                    </div>
                             
                    <div className='flex justify-center  mt-4'>
                    <select 
                    onChange={(e) => setType(e.target.value)}
                    class=" px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="animals">
                        <option value="">
                        Tipo de pelicula
                        </option>
                        <option value="movie">
                            movie
                        </option>
                        <option value="caroussel">
                            caroussel
                        </option>
                        <option value="premiere">
                            premiere
                        </option>
                        <option value="tiktok">
                            tiktok
                        </option>
                    </select>
                    </div>
                    <div className='flex'> 
                    <button
                        onClick={() => getInfoMovie(movieId)}
                        class="py-2 px-4 mt-8  bg-black  border-2 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        Obtener Informacion
                    </button>
                    <button
                        onClick={() => createInfoMovie()}
                        class="py-2 px-4 mt-8  bg-green-800 ml-4  border-2 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                           Crear pelicula
                    </button>
                    </div>
                </div>
            </Modal>


            <button

                onClick={() => openModal()}
                class="py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white absolute  top-4 right-42  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                Nueva Pelicula
            </button>


            <div class="px-4 py-4 container overflow-hidden m-24">
                <div class="inline-block overflow-hidden rounded-lg shadow">
                    <table class=" leading-normal">
                        <thead>
                            <tr>
                                <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Image
                                </th>
                                <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Platform
                                </th>
                                <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Description
                                </th>
                                <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Categories
                                </th>
                                <th scope="col" class="px-5 py-3 text-sm text-center font-normal   text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Actions
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                movies.map((movie) => (
                                    <MovieItem
                                        key={movie.id}

                                        imgPoster={movie.imagePoster}
                                        name={movie.name}
                                        platform={movie.platform}
                                        description={movie.overview}
                                        categoriesObj={movie.categories}
                                    />
                                ))

                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    )
}

export default MovieScreen