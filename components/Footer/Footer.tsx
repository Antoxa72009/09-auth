import Link from "next/link"
import css from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Anton Stepanenko</p>
          <p>
            Contact us:
            <Link href="mailto:anton_stepanenko72009@ukr.net">anton_stepanenko72009@ukr.net</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;