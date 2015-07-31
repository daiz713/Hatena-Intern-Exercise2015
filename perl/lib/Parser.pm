package Parser;
use strict;
use warnings;
use Log;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub parse {
  my $self = shift;
  my $file = $self->{filename};
  my $res = [];
  # ファイルを開く
  open my $fh, '<', $file or die $!;
  my @lines = <$fh>; # リストコンテキストなので(残りの)すべての行を配列として読み込む

  # 内容を一行ずつ見る
  my $line;
  for $line (@lines) {
    chomp($line);

    # split演算子でタブ区切りにする(p.196)
    my @splitted_logs = split /\t/, $line;

    my $log = Log->new(
      # mapを使ってリストの要素を変換する(p.360)
      map {
        my ($key, $val) = split /:/, $_, 2;
        # 値が'-'であるkey-valueペアは除去
        ($val eq "-") ? () : ($key, $val);
      } @splitted_logs
    );

    # push演算子(p.61)
    push $res, $log;
  }

  return $res;
}

1;
