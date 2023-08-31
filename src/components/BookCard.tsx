import { FC } from 'react'
import { GameProps } from '../types/types'
import { Link } from 'react-router-dom'
import { getGameInfo, setCurrentGame } from '../app/resultsSlice'
import { useAppDispatch } from '../app/hooks'
import { formatDate } from '../app/functions'

const BookCard: FC<GameProps> = ({ game }) => {

    const dispatch = useAppDispatch()

    const handleClick = async () => {
        dispatch(setCurrentGame(game.id))
        await dispatch(getGameInfo(game.id))
    }

    return (
        <Link to={`/${game.id}`} className='book-card' onClick={handleClick}>
                <img src={game.thumbnail} alt={game.title || 'Unknown title'} loading='lazy'/>
                <div className="book-card__text">
                   <div className='card-style title'>{game.title || 'Unknown title'}</div>
                    <div className='card-style'>Дата релиза: {formatDate(game.release_date) || 'Unknown release date'}</div>
                    <div className='card-style'>Издатель: {game.publisher || 'Unknown publisher'}</div>
                    <div className='card-style'>Жанр: {game.genre || 'Unknown genre'}</div> 
                </div>
        </Link>
    )
}

export default BookCard
