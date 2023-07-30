import { DomManipulator } from '$lib/dom'
import {it, expect} from 'vitest';

it('getDomElementFromHTML returns a DOM element', () => {
  const htmlString = '<div id="test"></div>'
  const element = DomManipulator.getDomElementFromHTML(htmlString)
  expect(element).not.toBeNull()
  expect(element!.nodeName).toBe('DIV')
  expect((element as HTMLElement).id).toBe('test')
})

it('addChildToDomElement appends a child to a parent node', () => {
  const parentHTML = '<div id="parent"></div>'
  const childHTML = '<p id="child">Hello</p>'
  let parent = DomManipulator.getDomElementFromHTML(parentHTML)
  const child = DomManipulator.getDomElementFromHTML(childHTML)
  parent = DomManipulator.addChildToDomElement(parent!, child!)
  expect((parent as HTMLElement).innerHTML).toContain(childHTML)
})
