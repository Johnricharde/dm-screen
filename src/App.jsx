import PageLeft from './LeftPage/PageLeft';
import PageRight from './RightPage/PageRight';

export default function App() {
  return (
    <div className="flex">
      <PageLeft />
      <PageRight />
    </div>
  )
}