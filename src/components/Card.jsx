import { useSelector } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FaRegImage } from 'react-icons/fa'

function Card({ data, trending, index, media_type }) {



    const imgURL = useSelector(state => state.moiveoData.imgURL)

    const mediaType = data.media_type ?? media_type


    return (
        <Link to={'/' + mediaType + '/' + data.id} className='w-full min-w-[230px] max-w-[230px] block h-80 rounded overflow-hidden relative bg-neutral-800 group' title={data?.title || data?.name}>

            {data?.poster_path
                ? (<img src={imgURL + data.poster_path} alt={data?.title || data?.name} className='lg:group-hover:scale-125 duration-500 absolute' />)
                : (<div className='w-[230px] h-[320px] bg-neutral-800 flex justify-center items-center text-lg'>Unavailable :(</div>)}




            <div className={`absolute top-4 flex ${!trending && 'flex-row-reverse'} items-center justify-between w-full`}>
                {
                    trending &&
                    // trending badge
                    <div className='py-1 px-4  bg-opacity-40 backdrop-blur-3xl rounded-r-full text-neutral-200/80 bg-black/50 overflow-hidden font-bold'>
                        #{index} Trending
                    </div>
                }
                {/* rating */}
                <p className='bg-yellow-500/80 py-1 px-2 mr-2 rounded-xl font-bold text-lg text-neutral-50'>{Number(data.vote_average || 0).toFixed(1)}</p>
            </div>



            <div className='hover:lg:translate-y-0 lg:translate-y-16 group-hover:translate-y-0 transition-all duration-500 absolute bottom-0 h-16 backdrop-blur-sm w-full bg-black/50 p-2'>

                {/* title */}
                <h2 className='text-ellipsis line-clamp-1 text-lg font-bold'>{data?.title || data?.name}</h2>

                <div className='text-sm text-neutral-400 flex justify-between items-end'>
                    {/* release date */}
                    <p className=''>{moment(data?.release_date || data?.first_air_date).format("MMMM Do YYYY")}</p>

                </div>

            </div>

        </Link>
    )
}

export default Card