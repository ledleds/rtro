import { h } from 'preact';
import style from './style';
import NameEntry from '../../components/NameEntry'

const Home = () => (
	<div class={style.home}>
		<h1>Welcome</h1>
		<NameEntry />
	</div>
);

export default Home;
