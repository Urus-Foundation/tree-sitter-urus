import XCTest
import SwiftTreeSitter
import TreeSitterUrus

final class TreeSitterUrusTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_urus())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Urus grammar")
    }
}
