import PageLeft from './tabsLeft/PageLeft';
import PageRight from './tabsRight/PageRight';

export default function App() {
  return (
    <div className="flex">
      <PageLeft />
      <PageRight />
    </div>
  )
}