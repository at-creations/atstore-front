import Head from 'next/head'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import "@/app/globals.css"
import { useTranslations } from 'next-intl'

const Custom404 = () => {
  const t = useTranslations("404Page");

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="https://cdn2.atcreations.ca/logo/logo_no_txt_no_bg.png"
          type="image/png"
        />
      </Head>
      <div className="w-screen h-screen fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0071bc] text-white">
        <main className="flex-grow flex flex-col items-center justify-center text-center">
          <div className="container flex flex-col md:flex-row items-center gap-5 md:gap-20">
            <Image
              src="https://cdn2.atcreations.ca/data/logo_white_square_text.png"
              alt="AT Creations Logo"
              width={48}
              height={48}
              className="logo w-32 h-32 md:w-48 md:h-48"
            />
            <div className="divider hidden md:block w-0.5 h-36 bg-white"></div>
            <div className="text max-w-md">
              <h1 className="text-4xl font-bold mb-4">{t("message1")}</h1>
              <p className="text-xl mb-8">{t("message2")}</p>
              <div className="buttons flex md:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 bg-white text-[#0071bc] rounded hover:bg-[#005a9e] hover:text-white transition-colors"
                  passHref
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path
                      d="M14.6771 6.76403L8.47119 1.05463C8.26944 0.86902 8.00377 0.768571 7.72969 0.774278C7.45561 0.779986 7.19434 0.891407 7.0005 1.08525L1.29291 6.79288L1 7.08575V15.5H6.5V10.25H9.5V15.5H15V7.06116L14.6771 6.76403ZM7.75119 1.77407C7.76 1.77407 7.75456 1.77597 7.75078 1.77969C7.74687 1.77597 7.74237 1.77407 7.75119 1.77407ZM14 14.5H10.5V10.25C10.5 9.98476 10.3946 9.7304 10.2071 9.54287C10.0196 9.35533 9.76522 9.24997 9.5 9.24997H6.5C6.23478 9.24997 5.98043 9.35533 5.79289 9.54287C5.60536 9.7304 5.5 9.98476 5.5 10.25V14.5H2V7.49997L7.75119 1.79235C7.75159 1.79197 7.75162 1.79163 7.75194 1.79125L14 7.49997V14.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  {t("home")}
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center px-4 py-2 bg-white text-[#0071bc] rounded hover:bg-[#005a9e] hover:text-white transition-colors"
                  passHref
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path
                      d="M5 3.00122V4.00122H14.5V5.98075L13.3906 9.50122H4.68538L3.43537 0.5H0.5V1.5H2.56463L3.81463 10.5012H14.124L15.5 6.13456V3.00122H5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5.53076 11.5109C5.00051 11.5115 4.49216 11.7224 4.11721 12.0973C3.74227 12.4723 3.53137 12.9806 3.53076 13.5109V13.5109C3.53076 14.0413 3.74148 14.55 4.11655 14.9251C4.49162 15.3002 5.00033 15.5109 5.53076 15.5109C6.06119 15.5109 6.5699 15.3002 6.94497 14.9251C7.32004 14.55 7.53076 14.0413 7.53076 13.5109V13.5109C7.53016 12.9806 7.31926 12.4723 6.94431 12.0973C6.56937 11.7224 6.06101 11.5115 5.53076 11.5109V11.5109ZM5.53076 14.5109C5.33298 14.5109 5.13964 14.4522 4.97519 14.3423C4.81074 14.2325 4.68257 14.0763 4.60688 13.8935C4.53119 13.7108 4.51139 13.5098 4.54998 13.3158C4.58856 13.1218 4.6838 12.9436 4.82365 12.8038C4.96351 12.6639 5.14169 12.5687 5.33567 12.5301C5.52965 12.4915 5.73072 12.5113 5.91344 12.587C6.09617 12.6627 6.25235 12.7908 6.36223 12.9553C6.47211 13.1197 6.53076 13.3131 6.53076 13.5109C6.53044 13.776 6.42499 14.0302 6.23752 14.2176C6.05005 14.4051 5.79588 14.5105 5.53076 14.5109V14.5109Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12.5309 11.5109C12.0006 11.5115 11.4923 11.7224 11.1173 12.0973C10.7424 12.4723 10.5315 12.9806 10.5309 13.5109C10.5309 14.0413 10.7416 14.55 11.1167 14.9251C11.4917 15.3002 12.0005 15.5109 12.5309 15.5109C13.0613 15.5109 13.57 15.3002 13.9451 14.9251C14.3202 14.55 14.5309 14.0413 14.5309 13.5109C14.5303 12.9806 14.3194 12.4723 13.9444 12.0973C13.5695 11.7224 13.0611 11.5115 12.5309 11.5109V11.5109ZM12.5309 14.5109C12.3331 14.5109 12.1398 14.4522 11.9753 14.3423C11.8109 14.2325 11.6827 14.0763 11.607 13.8935C11.5313 13.7108 11.5115 13.5098 11.5501 13.3158C11.5887 13.1218 11.6839 12.9436 11.8238 12.8038C11.9636 12.6639 12.1418 12.5687 12.3358 12.5301C12.5298 12.4915 12.7308 12.5113 12.9136 12.587C13.0963 12.6627 13.2525 12.7908 13.3624 12.9553C13.4722 13.1197 13.5309 13.3131 13.5309 13.5109C13.5306 13.776 13.4251 14.0302 13.2376 14.2176C13.0502 14.4051 12.796 14.5105 12.5309 14.5109V14.5109Z"
                      fill="currentColor"
                    />
                  </svg>
                  {t("products")}
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Custom404