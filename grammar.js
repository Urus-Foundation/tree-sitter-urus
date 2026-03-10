/**
 * @file An attempt to write tree-sitter parser for Urus programming language
 * @author Kamal Fasya <kamalfasya01@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

// grammar.js

module.exports = grammar({
  name: "urus",

  rules: {
    source_file: ($) =>
      repeat($._definition),

    _definition: ($) =>
      choice($.function_definition),

    function_definition: ($) =>
      seq(
        "fn",
        field("name", $.identifier),
        "(",
        optional($.parameter_list),
        ")",
        optional(
          seq(
            ":",
            field(
              "return_type",
              $._type,
            ),
          ),
        ),
        "{",
        repeat($._statement),
        "}",
      ),

    parameter_list: ($) =>
      commaSep1($.parameter),

    parameter: ($) =>
      seq(
        field("name", $.identifier),
        ":",
        field("type", $._type),
      ),

    _statement: ($) =>
      choice($.expression_statement),

    expression_statement: ($) =>
      seq(
        field(
          "expression",
          $._expression,
        ),
        ";",
      ),

    _expression: ($) =>
      choice(
        $.call_expression,
        $.string_literal,
      ),

    call_expression: ($) =>
      prec.left(
        seq(
          field(
            "function",
            $.identifier,
          ),
          "(",
          optional(
            commaSep($._expression),
          ),
          ")",
        ),
      ),

    string_literal: ($) =>
      seq(
        '"',
        repeat(/[^"\\]|\\./),
        '"',
      ),

    identifier: ($) =>
      /[a-zA-Z_][a-zA-Z0-9_]*/,

    _type: ($) =>
      choice(
        "void",
        "int",
        "string",
        "bool",
        // add more types later if needed
      ),
  },
});

// Helper for comma-separated lists (1 or more items)
function commaSep1(rule) {
  return seq(
    rule,
    repeat(seq(",", rule)),
  );
}

function commaSep(rule) {
  return optional(commaSep1(rule));
}
