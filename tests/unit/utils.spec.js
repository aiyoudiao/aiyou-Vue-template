import { defaultDocumentTitle, getDocumentTitle } from '@common/utils'

it('getDocumentTitle test', () => {
    const title = '这是一个测试'
    expect(getDocumentTitle(title)).toMatch(`${defaultDocumentTitle} - ${title}`)
})
