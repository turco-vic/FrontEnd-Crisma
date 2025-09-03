import styles from './Home.module.css';
import Header from '../../components/Header';
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <h1>Welcome to the Home Page</h1>
      <Footer />
    </div>
  );
}  
