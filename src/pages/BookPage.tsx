import { FC } from 'react'
import { Link } from 'react-router-dom'
import { GameInfoType } from '../types/types'
import { useAppSelector } from '../app/hooks'
import { ReactComponent as Spinner } from '../media/spinner.svg'
import Carousel from 'react-material-ui-carousel'
import { formatDate } from '../app/functions'

type bookPageProps = {
    game: GameInfoType,
}

const BookPage: FC<bookPageProps> = ({ game }) => {

    const { 
        thumbnail, 
        release_date, 
        publisher, 
        developer, 
        genre, 
        title, 
        minimum_system_requirements, 
        screenshots 
    } = game
    
    const isLoading = useAppSelector(state => state.results.isLoading)

    return (
        <div className="book-page-bg page">
            {
                isLoading ? <div className="loading"><Spinner /></div> :
                 <div className='container'>
                <div className="book-page">
                    <div className="book-page__intro">
                        <div>
                            {
                                thumbnail ? <img src={thumbnail} alt={title} loading='lazy' /> : <div className="img-placeholder">No Image</div>
                            }
                        </div>
                        <div className="text">
                            <div className='title'>{title}</div>
                            <div className='title'>Дата релиза: {formatDate(release_date)}</div>
                            <div className='title'>Издатель: {publisher}</div>
                            <div className='title'>Разработчик: {developer}</div>
                            <div className='title'>Жанр: {genre}</div>
                            <div className='title'>Минимальные системные требования</div>
                            <ul>
                                <li>{minimum_system_requirements.graphics}</li>
                                <li>{minimum_system_requirements.os}</li>
                                <li>{minimum_system_requirements.memory}</li>
                                <li>{minimum_system_requirements.processor}</li>
                                <li>{minimum_system_requirements.storage}</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <Carousel>
                            {
                                screenshots.map( (item, i) => <Item key={item.id} image={item.image} /> )
                            }
                        </Carousel>
                    </div>
                </div>
            </div>
            }        
            <Link className="back-btn" to='/'>🡠 Back</Link>
        </div>

    )
}

function Item(props: {key: number, image: string}) {
    return (
            <div className="screenshot__container">
                <img className="screenshot" key={props.key} src={props.image} alt='Screenshot' />
            </div>
    )
}

export default BookPage
