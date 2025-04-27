import BookItem from './BookItem';

export default function BookList({ books }) {
  return (
    <div className="library-container">
      <h1>📚 霍格沃茨禁书区</h1>
      <div className="book-shelf">
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}