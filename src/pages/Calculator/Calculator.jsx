import CalcForm from 'components/CalcForm';
import styles from './Calculator.module.css';
export default function CalculatorPage() {
  return (
    <div className={styles.Thumb}>
      <CalcForm />
    </div>
  );
}
