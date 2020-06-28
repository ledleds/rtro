import { h } from 'preact';
import style from './style';
import NameEntry from '../../components/NameEntry';

const Home = () => {
	return <div class={style.home}>
		<h1 class={style.welcome}>Welcome to rtro.</h1>
		<NameEntry />
	</div>
};

export default Home;
