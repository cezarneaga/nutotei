import { ArticleJsonLd, NextSeo } from 'next-seo'
import { ReactNode } from 'react'
import Head from 'next/head'
import Image from 'next/legacy/image'
import { BLOCKS, MARKS, Block, Inline } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from 'components/layout'

import { getReports, getReportDocuments } from 'lib/api'
import { ReportDocument, Report } from '../../lib/contentTypes'
import { ReportsLoader, ReportsTOC } from 'components/report'
import { reports } from 'lib/reports'
type Props = {
    reports: Report[]
    reportDocuments: ReportDocument[]
    preview: boolean
}

const Bold = ({ children }: { children: ReactNode }) => <strong>{children}</strong>
const Text = ({ children }: { children: ReactNode }) => <p>{children}</p>

const options = {
    renderMark: {
        [MARKS.BOLD]: (text: ReactNode) => <Bold>{text}</Bold>,
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => <Text>{children}</Text>,
    },
}
export default function Raport({ preview, reportDocuments, reports }: Props) {
    const router = useRouter();

    if (!router.isFallback && !reports.length && !reportDocuments.length) {
        return <ErrorPage statusCode={404} />
    }
    return (
        <Layout preview={preview}>
            {router.isFallback ? (
                <>Loading…</>
            ) : (
                <div className='bg-white'>
                    <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
                        <div className='mt-1 text-4xl font-bold sm:text-5xl sm:tracking-tight lg:text-6xl text-center'>
                            <a
                                id='report-pdf'
                                href={reportDocuments[0].document.url}
                                target='_blank'
                                title='Descarcă raportul în format PDF'
                                rel='noopener noreferrer'
                                style={{ color: '#4278b3' }}
                            >
                                <p>Descarcă raportul</p>
                            </a>
                        </div>
                        <ReportsTOC reports={reports} />
                        <ReportsLoader reports={reports} />
                    </div>
                </div>
            )
            }
        </Layout >
    )
}
export async function getStaticProps({ params, preview = false }: { params: { year: number }, preview: boolean }): Promise<{ props: Props }> {
    const { year } = params;
    const reports: Report[] = await getReports(year)
    const reportDocuments: ReportDocument[] = await getReportDocuments(year)

    return {
        props: {
            preview,
            reports,
            reportDocuments,
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: reports.map((raport) => `/rapoarte/${raport.year}`),
        fallback: true,
    }
}
