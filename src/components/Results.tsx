import { FC } from 'react'
import { useAppSelector } from '../app/hooks'
import BookCard from './BookCard'

const Results: FC = () => {

    const results = useAppSelector(state => state.results.results)

    return (
        <div className='results' >
            <div className="container">
                <div className="book-cards">
                    {
                        results.map(result => (
                            <BookCard key={result.id} game={result} />
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Results
