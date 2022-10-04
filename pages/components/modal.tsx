import styles from '../../styles/Home.module.scss'

type Props = {
  show: boolean,
  setShow: (value: boolean |((prevVar: boolean) => boolean)) => void;
}

export default function modal ({show, setShow}:Props) {
  if (show) {
    return (
      <>
        <div className={styles.overlay}>
          <div>
            <p>content</p>
            <button onClick={() => setShow(false)}>閉じる</button>
          </div>
        </div>
      </>
    )
  }else {
    return (<></>)
  }
}
